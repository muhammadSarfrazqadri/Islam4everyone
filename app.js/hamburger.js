const navToggle = document.getElementById("navToggle");
const mobileNavDropdown = document.getElementById("mobileNavDropdown");

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
