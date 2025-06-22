
// Urdu Typewriter effect
const textsUrdu = [
  "ہزاروں اسلامی نام...",
  "عربی، اردو اور انگریزی معانی کے ساتھ...",
  "مسلمان لڑکوں اور لڑکیوں کے بہترین نام...",
  "سب سے خوبصورت اسلامی نام تلاش کریں..."
];

let countUr = 0;
let indexUr = 0;
let currentTextUr = "";
let letterUr = "";

const typewriterUrdu = document.querySelector(".typewriter-ur");

function typeUrdu() {
  if (countUr === textsUrdu.length) countUr = 0;
  currentTextUr = textsUrdu[countUr];
  letterUr = currentTextUr.slice(0, ++indexUr);
  typewriterUrdu.textContent = letterUr;

  if (letterUr.length === currentTextUr.length) {
    setTimeout(eraseUrdu, 1500);
  } else {
    setTimeout(typeUrdu, 100);
  }
}

function eraseUrdu() {
  if (indexUr > 0) {
    letterUr = currentTextUr.slice(0, --indexUr);
    typewriterUrdu.textContent = letterUr;
    setTimeout(eraseUrdu, 50);
  } else {
    countUr++;
    setTimeout(typeUrdu, 500);
  }
}

typeUrdu();