document.addEventListener("DOMContentLoaded", function () {
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
  const navLinks = document.getElementById("navLinks")





    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navToggle.classList.toggle("active");
      mobileNavDropdown.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !mobileNav.contains(e.target)) {
        navToggle.classList.remove("active");
        mobileNav.classList.remove("active");
      }
    });
















  let namesData = [];
  let namesToShow = 15;
  let currentLang = localStorage.getItem("lang") || "en";
  let isDarkMode = localStorage.getItem("theme") === "dark";

  // Modal popup for details
  function showDetailsModal(nameObj) {
    let modal = document.getElementById('detailsModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'detailsModal';
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
    // Fill modal content
    modal.querySelector('.modal-title').textContent = nameObj.name_en + ' / ' + nameObj.name_ur;
    modal.querySelector('.modal-meaning').textContent = nameObj.meaning_en + ' / ' + nameObj.meaning_ur;
    modal.querySelector('.modal-id').textContent = 'ID: ' + nameObj.id;
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
    // Close logic
    modal.querySelector('.modal-close').onclick = function() {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    };
    modal.querySelector('.modal-backdrop').onclick = function() {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    };
  }

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    // langText.textContent = lang === "ur" ? "اردو" : "English";
    if (langIcon) {
      langIcon.className = lang === "ur" ? "fa-solid fa-earth-asia" : "fa-solid fa-language";
    }
    document.documentElement.setAttribute("lang", lang);
    // Update all UI elements with data-en/data-ur
    document.querySelectorAll('[data-en], [data-ur]').forEach(el => {
      if (lang === "ur" && el.hasAttribute("data-ur")) {
        el.textContent = el.getAttribute("data-ur");
      } else if (lang === "en" && el.hasAttribute("data-en")) {
        el.textContent = el.getAttribute("data-en");
      }
    });
    // Update logo and footer if needed
    if (logo && logo.hasAttribute('data-en') && logo.hasAttribute('data-ur')) {
      logo.textContent = lang === 'en' ? logo.getAttribute('data-en') : logo.getAttribute('data-ur');
    }
    if (footerText && footerText.hasAttribute('data-en') && footerText.hasAttribute('data-ur')) {
      footerText.textContent = lang === 'en' ? footerText.getAttribute('data-en') : footerText.getAttribute('data-ur');
    }
    // Update More Names button
    if (moreNamesBtn) {
      moreNamesBtn.textContent = lang === 'en' ? 'More Names' : 'مزید نام';
    }
    // Update search placeholder
    if (searchInput) {
      searchInput.placeholder = lang === 'en' ? 'Search Names' : 'نام تلاش کریں';
    }
    // Re-render names if data loaded
    if (namesData.length && namesSection) {
      renderNames(namesData);
    }
    if (typeof syncMobileToggles === 'function') syncMobileToggles();
  }

  function setTheme(theme) {
    isDarkMode = theme === 'dark';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', isDarkMode);
    if (themeIcon) {
      if (isDarkMode) {
        themeIcon.className = 'fa-solid fa-moon';
        if (document.getElementById('themeText')) document.getElementById('themeText').textContent = 'Dark';
        if (document.getElementById('mobileThemeText')) document.getElementById('mobileThemeText').textContent = 'Dark';
      } else {
        themeIcon.className = 'fa-solid fa-sun';
        if (document.getElementById('themeText')) document.getElementById('themeText').textContent = 'Light';
        if (document.getElementById('mobileThemeText')) document.getElementById('mobileThemeText').textContent = 'Light';
      }
    }
    if (mobileThemeIcon) mobileThemeIcon.className = themeIcon.className;
    if (typeof syncMobileToggles === 'function') syncMobileToggles();
  }

  if (langBtn) {
    langBtn.addEventListener('click', function () {
      setLanguage(currentLang === 'en' ? 'ur' : 'en');
    });
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      setTheme(isDarkMode ? 'light' : 'dark');
    });
  }

  setLanguage(currentLang);
  setTheme(isDarkMode ? 'dark' : 'light');

  // Fetch names from JSON and render
  if (namesSection) {
    fetch("json/names.json")
      .then((res) => res.json())
      .then((data) => {
        namesData = data;
        renderNames(namesData);
      });
  }

  function renderNames(names) {
    namesSection.innerHTML = "";
    names.slice(0, namesToShow).forEach((name) => {
      namesSection.innerHTML += `
        <div class="name-card">
          <button class="accordion-toggle">
            <span class="name" data-en="${name.name_en}" data-ur="${name.name_ur}">${currentLang === "ur" ? name.name_ur : name.name_en}</span>
            <i class="fa-solid fa-chevron-right"></i>
          </button>
          <div class="accordion-content">
            <p class="meaning" data-en="${name.meaning_en}" data-ur="${name.meaning_ur}">${currentLang === "ur" ? name.meaning_ur : name.meaning_en}</p>
            <button class="details-btn" data-id="${name.id}">${currentLang === "ur" ? "مزید تفصیل" : "More Details"}</button>
          </div>
        </div>
      `;
    });
    addAccordionListeners();
    if (moreNamesBtn) {
      moreNamesBtn.style.display = names.length > namesToShow ? "inline-block" : "none";
    }
    document.querySelectorAll(".details-btn").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        const nameObj = namesData.find(n => n.id == id);
        if (nameObj) showDetailsModal(nameObj);
      });
    });
  }

  function addAccordionListeners() {
    const cards = document.querySelectorAll(".name-card");
    cards.forEach((card) => {
      const toggle = card.querySelector(".accordion-toggle");
      if (toggle) {
        toggle.addEventListener("click", (e) => {
          e.stopPropagation();
          cards.forEach((c) => {
            if (c !== card) c.classList.remove("active");
          });
          card.classList.toggle("active");
        });
      }
    });
  }

  // More Names Button
  if (moreNamesBtn) {
    moreNamesBtn.addEventListener("click", () => {
      window.location.href = "htmls/allnames.html";
    });
  }

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const filter = this.value.toLowerCase();
      const filtered = namesData.filter(
        (name) =>
          name.name_en.toLowerCase().includes(filter) ||
          name.name_ur.includes(filter) ||
          name.meaning_en.toLowerCase().includes(filter) ||
          name.meaning_ur.includes(filter)
      );
      renderNames(filtered);
    });
  }

  // Hamburger menu toggle for mobile
  if (navToggle && mobileNavDropdown) {
    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      mobileNavDropdown.classList.toggle("open");
    });
    document.addEventListener("click", function (e) {
      if (
        mobileNavDropdown.classList.contains("open") &&
        !mobileNavDropdown.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        mobileNavDropdown.classList.remove("open");
      }
    });
  }

  // Sync mobile toggles with desktop toggles
  function syncMobileToggles() {
    // Language
    if (mobileLangText) mobileLangText.textContent = langText.textContent;
    if (mobileLangIcon) mobileLangIcon.className = langIcon.className;
    // Theme
    if (mobileThemeIcon) mobileThemeIcon.className = themeIcon.className;
  }

  // Mobile language toggle
  if (mobileLangBtn) {
    mobileLangBtn.addEventListener("click", function () {
      setLanguage(currentLang === "en" ? "ur" : "en");
      syncMobileToggles();
    });
  }
  // Mobile theme toggle
  if (mobileThemeBtn) {
    mobileThemeBtn.addEventListener("click", function () {
      setTheme(isDarkMode ? "light" : "dark");
      syncMobileToggles();
    });
  }

  // Update mobile toggles on page load and whenever language/theme changes
  setTimeout(syncMobileToggles, 100);
});