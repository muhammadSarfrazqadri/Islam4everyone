document.addEventListener("DOMContentLoaded", function () {

  // ============================== VARIABLE DECLARATIONS =============================

  const namesSection = document.getElementById("namesSection");
  const moreNamesBtn = document.getElementById("moreNamesBtn");
  const searchInput = document.getElementById("searchInput");
  const navToggle = document.getElementById("navToggle");
  const mobileNavDropdown = document.getElementById("mobileNavDropdown");

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

    modal.querySelector(".modal-title").textContent = nameObj.name_en;
    modal.querySelector(".modal-meaning").textContent = nameObj.meaning_en;
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
          name.name_en.toLowerCase().includes(filter) ||
          name.meaning_en.toLowerCase().includes(filter)
      );
      renderNames(filtered);
    });
  }
});
