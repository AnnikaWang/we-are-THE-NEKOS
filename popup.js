const affirmations = [
  'You are allowed to take up space, exactly as you are.',
  'Rest is not a reward. It is part of being a person.',
  'You do not have to solve everything today.',
  'Small steps still count. Miso is proud of this one.',
  'Your feelings are visitors. You can greet them gently.',
  'You are doing better than your tired brain says you are.'
];

const affirmationElement = document.querySelector('#affirmation');
const nextButton = document.querySelector('#next-button');
const saveButton = document.querySelector('#save-button');
const saveLabel = document.querySelector('#save-label');
const soundToggle = document.querySelector('#sound-toggle');
let affirmationIndex = 0;

function showAffirmation() {
  affirmationIndex = (affirmationIndex + 1) % affirmations.length;
  affirmationElement.animate([{ opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, easing: 'ease-out' });
  affirmationElement.textContent = `“${affirmations[affirmationIndex]}”`;
  saveButton.classList.remove('saved');
  saveLabel.textContent = 'Save this thought';
}

nextButton.addEventListener('click', showAffirmation);
saveButton.addEventListener('click', async () => {
  const saved = !saveButton.classList.contains('saved');
  saveButton.classList.toggle('saved', saved);
  saveLabel.textContent = saved ? 'Saved for a rainy day' : 'Save this thought';
  await chrome.storage.local.set({ savedAffirmation: saved ? affirmations[affirmationIndex] : null });
});

soundToggle.addEventListener('click', () => {
  const isOn = soundToggle.getAttribute('aria-pressed') !== 'true';
  soundToggle.setAttribute('aria-pressed', String(isOn));
});

chrome.storage.local.get('savedAffirmation').then(({ savedAffirmation }) => {
  const savedIndex = affirmations.indexOf(savedAffirmation);
  if (savedIndex >= 0) {
    affirmationIndex = savedIndex;
    affirmationElement.textContent = `“${savedAffirmation}”`;
    saveButton.classList.add('saved');
    saveLabel.textContent = 'Saved for a rainy day';
  }
});