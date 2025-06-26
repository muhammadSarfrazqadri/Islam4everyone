// document.addEventListener("DOMContentLoaded", () => {
  const namesContainer = document.getElementById("namesContainer");
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let namesData = [];

  // Fetching data from JSON
  fetch("../json/names.json")
    .then(res => res.json())
    .then(data => {
      namesData = data;
      renderNames(namesData);
    });

  // Render names function
  function renderNames(names) {
    namesContainer.innerHTML = "";
    if (names.length === 0) {
      namesContainer.innerHTML = "<p>No names found.</p>";
      return;
    }
    names.forEach(name => {
      namesContainer.innerHTML += `
        <div class="name-card">
          <h3>${name.name_en}</h3>
          <p>${name.meaning_en}</p>
        </div>
      `;
    });
  }

  // Search functionality
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = namesData.filter(name => 
      name.name_en.toLowerCase().includes(searchTerm) || 
      name.meaning_en.toLowerCase().includes(searchTerm)
    );
    renderNames(filtered);
  });

  // Alphabet filter functionality
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const letter = button.dataset.letter;
      if (letter === "ALL") {
        renderNames(namesData);
      } else {
        const filtered = namesData.filter(name => 
          name.name_en.toLowerCase().startsWith(letter.toLowerCase())
        );
        renderNames(filtered);
      }
    });
  });