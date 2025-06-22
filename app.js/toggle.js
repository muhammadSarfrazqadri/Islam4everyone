document.addEventListener("DOMContentLoaded", () => {
  const langBtn = document.getElementById("toggleLang");
  const langIcon = document.getElementById("langIcon");

  // Check current page language
  const isUrduPage = window.location.pathname.includes("urdu-index");

  // Set initial icon
  if (isUrduPage) {
    langIcon.className = "fa-solid fa-earth-asia";  // Urdu page pe ho to Asia icon
  } else {
    langIcon.className = "fa-solid fa-language";    // English page pe ho to Language icon
  }

  // Language toggle click
  langBtn.addEventListener("click", () => {
    if (isUrduPage) {
      window.location.href = "index.html";
    } else {
      window.location.href = "urdu-index.html";
    }
  });

  // Start typewriter based on page
  if (!isUrduPage) {
    startEnglishTypewriter();
  } else {
    startUrduTypewriter();
  }
});

// ----------------- English Typewriter -----------------
function startEnglishTypewriter() {
  const texts = [
    "Thousands of Islamic Names...",
    "With Arabic, Urdu and English Meanings...",
    "Perfect Names for Muslim Boys and Girls...",
    "Find The Most Beautiful Islamic Names..."
  ];

  let count = 0;
  let index = 0;
  let currentText = "";
  let letter = "";

  const typewriterElement = document.querySelector(".typewriter");

  function type() {
    if (count === texts.length) count = 0;
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    typewriterElement.textContent = letter;

    if (letter.length === currentText.length) {
      setTimeout(erase, 1500);
    } else {
      setTimeout(type, 100);
    }
  }

  function erase() {
    if (index > 0) {
      letter = currentText.slice(0, --index);
      typewriterElement.textContent = letter;
      setTimeout(erase, 50);
    } else {
      count++;
      setTimeout(type, 500);
    }
  }

  type();
}

// ----------------- Urdu Typewriter -----------------
function startUrduTypewriter() {
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

  function typeUr() {
    if (countUr === textsUrdu.length) countUr = 0;
    currentTextUr = textsUrdu[countUr];
    letterUr = currentTextUr.slice(0, ++indexUr);
    typewriterUrdu.textContent = letterUr;

    if (letterUr.length === currentTextUr.length) {
      setTimeout(eraseUr, 1500);
    } else {
      setTimeout(typeUr, 100);
    }
  }

  function eraseUr() {
    if (indexUr > 0) {
      letterUr = currentTextUr.slice(0, --indexUr);
      typewriterUrdu.textContent = letterUr;
      setTimeout(eraseUr, 50);
    } else {
      countUr++;
      setTimeout(typeUr, 500);
    }
  }

  typeUr();
}