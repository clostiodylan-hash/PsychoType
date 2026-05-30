const writingSample = document.querySelector('#writingSample');
const analyzeButton = document.querySelector('#analyzeButton');
const resultTitle = document.querySelector('#resultTitle');
const resultCopy = document.querySelector('#resultCopy');
const confidence = document.querySelector('#confidence');

const archetypes = [
  {
    title: 'The Spark Strategist',
    copy: 'You move quickly from feeling to action, using vivid language and decisive phrasing to build momentum.'
  },
  {
    title: 'The Pattern-Seeker',
    copy: 'You connect ideas carefully, balancing reflection with a clear desire to make the next step make sense.'
  },
  {
    title: 'The Deep Diver',
    copy: 'You linger on nuance, context, and meaning, turning ordinary details into thoughtful insight.'
  }
];

function analyzeWriting() {
  const text = writingSample.value.trim();
  const words = text.split(/\s+/).filter(Boolean);

  if (words.length < 8) {
    resultTitle.textContent = 'Awaiting signal';
    resultCopy.textContent = 'Write at least eight words so PsychoType can form a playful snapshot.';
    confidence.textContent = '12%';
    return;
  }

  const punctuationEnergy = (text.match(/[!?]/g) || []).length;
  const longWords = words.filter((word) => word.length > 7).length;
  const archetypeIndex = (punctuationEnergy + longWords + words.length) % archetypes.length;
  const selected = archetypes[archetypeIndex];
  const score = Math.min(96, 48 + words.length * 3 + punctuationEnergy * 5);

  resultTitle.textContent = selected.title;
  resultCopy.textContent = selected.copy;
  confidence.textContent = `${score}%`;
}

analyzeButton.addEventListener('click', analyzeWriting);
writingSample.addEventListener('input', () => {
  if (writingSample.value.trim().length === 0) {
    resultTitle.textContent = 'Awaiting signal';
    resultCopy.textContent = 'Add a writing sample to reveal your PsychoType archetype.';
    confidence.textContent = '0%';
  }
});
