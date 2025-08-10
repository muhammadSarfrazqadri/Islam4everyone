// English Typewriter effect
const texts = [
  "Thousands of Islamic Names...",
  "With Arabic, Urdu and English Meanings...",
  "Perfect Names for Muslim Boys and Girls...",
  "Find The Most Beautiful Islamic Names...",
  "Calculate Your Age Easily...",
  "Find Collified and Experiensed Quran Tutor..."
];

let countEn = 0;
let indexEn = 0;
let currentTextEn = "";
let letterEn = "";

function typeEnglish() {
  if (countEn === texts.length) countEn = 0;
  currentTextEn = texts[countEn];
  letterEn = currentTextEn.slice(0, ++indexEn);
  document.getElementById("typewriter").textContent = letterEn;

  if (letterEn.length === currentTextEn.length) {
    setTimeout(eraseEnglish, 1500);
  } else {
    setTimeout(typeEnglish, 100);
  }
}

function eraseEnglish() {
  if (indexEn > 0) {
    letterEn = currentTextEn.slice(0, --indexEn);
    document.getElementById("typewriter").textContent = letterEn;
    setTimeout(eraseEnglish, 50);
  } else {
    countEn++;
    setTimeout(typeEnglish, 500);
  }
}

typeEnglish();
