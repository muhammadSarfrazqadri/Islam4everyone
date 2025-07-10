// document.addEventListener("DOMContentLoaded", () => {
//   const namesContainer = document.getElementById("namesSection");
//   const searchInput = document.getElementById("searchInput");
//   const filterButtons = document.querySelectorAll(".alphabet-button");

//   let namesData = [];

//   // Fetching data
//   fetch("../json/names.json")
//     .then(res => res.json())
//     .then(data => {
//       namesData = data;
//       renderNames(namesData);
//     });

//   // Render names
//   function renderNames(names) {
//     namesContainer.innerHTML = "";
//     if (names.length === 0) {
//       namesContainer.innerHTML = "<p style='text-align:center;'>No names found.</p>";
//       return;
//     }

//     names.forEach(name => {
//       namesContainer.innerHTML += `
//         <div class="name-card">
//           <h2 class="name">${name.name_en}</h2>
//           <p class="meaning"><i class="fa-solid fa-book-open-reader"></i> ${name.meaning_en}</p>
//           <a class="details-btn" href="detail.html?id=${name.id}">More Details</a>
//         </div>
//       `;
//     });
//   }

//   // Search functionality
//   searchInput.addEventListener("input", () => {
//     const searchTerm = searchInput.value.toLowerCase();
//     const filtered = namesData.filter(name =>
//       name.name_en.toLowerCase().includes(searchTerm) ||
//       name.meaning_en.toLowerCase().includes(searchTerm)
//     );
//     renderNames(filtered);
//   });

//   // Alphabet Filter
//   filterButtons.forEach(button => {
//     button.addEventListener("click", () => {
//       const letter = button.dataset.letter;
//       const filtered = namesData.filter(name =>
//         name.name_en.toLowerCase().startsWith(letter.toLowerCase())
//       );
//       renderNames(filtered);
//     });
//   });
// });