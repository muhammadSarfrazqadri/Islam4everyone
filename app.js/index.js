document.addEventListener("DOMContentLoaded", function () {
  // ============================== VARIABLE DECLARATIONS =============================

  const langBtn = document.getElementById("toggleLang");
  const langText = document.getElementById("langText");
  const langIcon = document.getElementById("langIcon");
  const themeBtn = document.getElementById("toggleTheme");
  const themeIcon = document.getElementById("themeIcon");
  const logo = document.querySelector(".logo");
  const footerText = document.querySelector("footer p");
  const namesSection = document.getElementById("namesSection");
  const moreNamesBtn = document.getElementById("moreNamesBtn");
  const searchInput = document.getElementById("searchInput");
  const navToggle = document.getElementById("navToggle");
  const mobileNavDropdown = document.getElementById("mobileNavDropdown");
  const mobileLangBtn = document.getElementById("mobileToggleLang");
  const mobileLangText = document.getElementById("mobileLangText");
  const mobileLangIcon = document.getElementById("mobileLangIcon");
  const mobileThemeBtn = document.getElementById("mobileToggleTheme");
  const mobileThemeIcon = document.getElementById("mobileThemeIcon");
  const navLinks = document.getElementById("navLinks");

  let namesData = [];
  let namesToShow = 10;

  // ============================== NAVBAR TOGGLE FOR MOBILE =============================

  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navToggle.classList.toggle("active");
    mobileNavDropdown.classList.toggle("active");
    if (
      mobileNavDropdown.classList.contains("active") &&
      history.state?.menuOpen !== true
    ) {
      history.pushState({ menuOpen: true }, "");
    }
  });

  document.addEventListener("click", (e) => {
    if (
      !navToggle.contains(e.target) &&
      !mobileNavDropdown.contains(e.target)
    ) {
      navToggle.classList.remove("active");
      mobileNavDropdown.classList.remove("active");
    }
  });

  window.addEventListener("popstate", () => {
    if (mobileNavDropdown.classList.contains("active")) {
      navToggle.classList.remove("active");
      mobileNavDropdown.classList.remove("active");
    }
  });

  // ============================== TYPEWRITER TEXT =============================

  const texts = [
    "Thousands of Islamic Names...",
    "With Arabic, Urdu and English Meanings...",
    "Perfect Names for Muslim Boys and Girls...",
    "Find The Most Beautiful Islamic Names...",
  ];
  let count = 0;
  let index = 0;
  let currentText = "";
  let letter = "";

  function type() {
    if (count === texts.length) count = 0;
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    document.getElementById("typewriter").textContent = letter;

    if (letter.length === currentText.length) {
      setTimeout(erase, 1500);
    } else {
      setTimeout(type, 100);
    }
  }

  function erase() {
    if (index > 0) {
      letter = currentText.slice(0, --index);
      document.getElementById("typewriter").textContent = letter;
      setTimeout(erase, 50);
    } else {
      count++;
      setTimeout(type, 500);
    }
  }

  type();

  // ============================== FETCHING NAMES DATA =============================

  fetch("../json/names.json")
    .then((res) => res.json())
    .then((data) => {
      namesData = data;
      renderNames(namesData);
    });

  // ============================== RENDER NAMES FUNCTION =============================

  function renderNames(names) {
    namesSection.innerHTML = "";
    names.slice(0, namesToShow).forEach((name) => {
      namesSection.innerHTML += `
      <div class="name-card">
      <div class="accordion-toggle">
          <h2 class="name">${name.name_en}</h2>
      </div>
        <div class="accordion-content">
          <p class="meaning">${name.meaning_en}</p>
          <button class="details-btn" data-id="${name.id}">More Details</button>
        </div>
    `;
    });

    addAccordionListeners();
    addDetailsBtnListeners();
  }

  // ============================== ACCORDION FUNCTION =============================

  function addAccordionListeners() {
    const cards = document.querySelectorAll(".name-card");
    cards.forEach((card) => {
      const toggle = card.querySelector(".accordion-toggle");
      toggle.addEventListener("click", () => {
        cards.forEach((c) => {
          if (c !== card) c.classList.remove("active");
        });
        card.classList.toggle("active");
      });
    });
  }

  // ============================== DETAILS MODAL FUNCTION =============================

  function addDetailsBtnListeners() {
    const detailsButtons = document.querySelectorAll(".details-btn");
    detailsButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const selectedName = namesData.find((n) => n.id == id);
        showDetailsModal(selectedName);
      });
    });
  }

  function showDetailsModal(nameObj) {
    let modal = document.getElementById("detailsModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "detailsModal";
      modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          <h2 class="modal-title"></h2>
          <p class="modal-meaning"></p>
          <p class="modal-id"></p>
        </div>
      `;
      document.body.appendChild(modal);
    }

    modal.querySelector(".modal-title").textContent = nameObj.name;
    modal.querySelector(".modal-meaning").textContent = nameObj.meaning;
    modal.querySelector(".modal-id").textContent = "ID: " + nameObj.id;

    modal.style.display = "block";
    document.body.classList.add("modal-open");

    modal.querySelector(".modal-close").onclick = () => {
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
    };
    modal.querySelector(".modal-backdrop").onclick = () => {
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
    };
  }

  // ============================== MORE NAMES BUTTON FUNCTION =============================

  if (moreNamesBtn) {
    moreNamesBtn.addEventListener("click", () => {
      window.location.href = "htmls/allnames.html";
    });
  }

  // ============================== SEARCH FUNCTIONALITY =============================

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const filter = this.value.toLowerCase();
      const filtered = namesData.filter(
        (name) =>
          name.name.toLowerCase().includes(filter) ||
          name.meaning.toLowerCase().includes(filter)
      );
      renderNames(filtered);
    });
  }
});
