// // CONNECTION WITH FIREBASE

// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
// import {
//   getFirestore,
//   collection,
//   getDocs,
// } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyBi79vA2god6khEWReMp2oUyUN_9ojkKA8",
//   authDomain: "islamic-names-website.firebaseapp.com",
//   projectId: "islamic-names-website",
//   storageBucket: "islamic-names-website.firebasestorage.app",
//   messagingSenderId: "1047190063212",
//   appId: "1:1047190063212:web:8ae012321185e15c457049",
//   measurementId: "G-E2X1E5YRZC",
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // FIREBASE CONNECTED SUCCESSFULLY

// // FETCHING DATA FOR CARDS

// async function fetchNames() {
//   try {
//     const names = await getDocs(collection(db, "names"));
//     names.forEach((name) => {
//       const { name_en, name_ur, meaning_en, meaning_ur } = name.data();
//       // console.log(name_en, name_ur, meaning_en, meaning_ur);
//       const card = document.getElementById("namesSection");
//       if (card) {
//         card.innerHTML += `
//         <div class="name-card">
//           <div class="accordion-toggle">
//           <h2 class="name">🔤 ${name_en}</h2>
//           <p class="meaning">📖 ${meaning_en}</p>
//         <hr />
//         <span class='ur_content' dir="rtl">
//           <h2 class="name">🔠 ${name_ur}</h2>
//           <p class="meaning">📚 ${meaning_ur}</p>
//         </span>
//         </div>
//         <button class='details-btn' data-id="${name.id}">More Details</button>
//     </div>`;
//       }
//     });
//   } catch (error) {
//     console.error("Error fetching names:", error);
//   }
// }
// fetchNames();

// // async function fetchAllNames() {
// //   try {
// //     const names = await getDocs(collection(db, "names"));
// //     names.forEach((name) => {
// //       const { name_en, name_ur, meaning_en, meaning_ur } = name.data();
// //       const namesCard = document.getElementById("allNamesSection");
// //       if (namesCard) {
// //         namesCard.innerHTML += `
// //         <div class="name-card">
// //           <h2 class="name">🔤 ${name_en}</h2> |
// //           <h2 class="name">🔠 ${name_ur}</h2>
// //         <button class='details-btn' data-id="${name.id}">More Details</button>
// //         </div>`;
// //       }
// //     });
// //   } catch (error) {
// //     console.error("Error fetching names:", error);
// //   }
// // }
// // fetchAllNames();

// // SEARCH FUNCTIONALITY
// const namesArray = [];
// async function searchData() {
//   try {
//     const names = await getDocs(collection(db, "names"));
//     names.forEach((doc) => {
//       const data = doc.data();
//       namesArray.push({
//         id: doc.id,
//         name_en: data.name_en.toLowerCase(),
//         name_ur: data.name_ur.toLowerCase(),
//         meaning_en: data.meaning_en,
//         meaning_ur: data.meaning_ur
//       });
//     });
//   } catch (error) {
//     console.error("Error fetching names:", error);
//   }
// }
// searchData();

// const resultsList = document.getElementById("resultsList");
// if (resultsList) {
//   document.getElementById("searchInput").addEventListener("keyup", function () {
//     const searchValue = this.value.toLowerCase();
//     resultsList.innerHTML = ""; // Clear previous results
//     if (searchValue) {
//       namesArray.forEach((name) => {
//         if (name.includes(searchValue)) {
//           const listItem = document.createElement("li");
//           listItem.textContent = name;
//           resultsList.appendChild(listItem);
//         }
//       });
//     }
//   });
// }

// // // const allNamesResultsList = document.getElementById("allNamesResultsList");
// // document.getElementById("allNamesSearchInput").addEventListener("keyup", function () {
// //   const namesCard = document.getElementById("allNamesSection");
// //     const searchValue = this.value.toLowerCase();
// //     console.log(searchValue);
// //     if (searchValue) {
// //     namesArray.forEach((name) => {
// //       if (name.includes(searchValue)) {
// //         namesCard.innerHTML = "";
// //         const listItem = document.createElement("li");
// //         listItem.textContent = name;
// //         namesCard.appendChild(listItem);
// //         listItem.classList.add("name-card");
// //       //   namesCard.innerHTML += `
// //       // <div class="name-card">
// //       // <h2 class="name">🔤 ${name}</h2>
// //       // </div>`;
// //     }
// //     // <button class='details-btn' data-id="${name.id}">More Details</button>
// //     });
// //   }
// //     //   namesArray.forEach((name) => {
// //     //     if (name.includes(searchValue)) {
// //     //     }
// //     //   });
// //     // }
// //   });






//   // document.getElementById("allNamesSearchInput").addEventListener("keyup", function () {
//   // const searchValue = this.value.toLowerCase();
//   // const namesCard = document.getElementById("allNamesSection");
//   // namesCard.innerHTML = ""; // Clear old content

//   // if (searchValue) {
//   //   const filteredNames = namesArray.filter((name) =>
//   //     name.name_en.includes(searchValue) || name.name_ur.includes(searchValue)
//   //   );
//   //   if (searchValue.length === 0) {
//   //     fetchAllNames();
//   //   } else {
//   //     namesCard.innerHTML = "<p>No names found.</p>";
//   //   }
//   // }

//   //   filteredNames.forEach((name) => {
//   //     namesCard.innerHTML += `
//   //       <div class="name-card">
//   //         <h2 class="name">🔤 ${name.name_en}</h2> |
//   //         <h2 class="name">🔠 ${name.name_ur}</h2>
//   //         <button class='details-btn' data-id="${name.id}">More Details</button>
//   //       </div>`;
//   //   });
//   // });







// // const namesArray = [];
//   async function fetchAllNames() {
//   try {
//     const names = await getDocs(collection(db, "names"));
//     const namesCard = document.getElementById("allNamesSection");
//     namesCard.innerHTML = "";

//     names.forEach((doc) => {
//       const data = doc.data();

//       if (!namesArray.find(item => item.id === doc.id)) {
//         namesArray.push({
//           id: doc.id,
//           name_en: data.name_en.toLowerCase(),
//           name_ur: data.name_ur.toLowerCase(),
//           meaning_en: data.meaning_en,
//           meaning_ur: data.meaning_ur
//         });
//       }

//       namesCard.innerHTML += `
//         <div class="name-card">
//           <h2 class="name">${data.name_en}</h2> |
//           <h2 class="name">${data.name_ur}</h2>
//           <button class='details-btn' data-id="${doc.id}">More Details</button>
//         </div>`;
//     });
//   } catch (error) {
//     console.error("Error fetching names:", error);
//   }
// }
// fetchAllNames();

// document.getElementById("allNamesSearchInput").addEventListener("keyup", function () {
//   const searchValue = this.value.toLowerCase();
//   const namesCard = document.getElementById("allNamesSection");
//   namesCard.innerHTML = "";
  
//   if (!searchValue) {
//     fetchAllNames();
//     return;
//   }

//   const filteredNames = namesArray.filter((name) =>
//     name.name_en.includes(searchValue) || name.name_ur.includes(searchValue)
//   );

//   if (filteredNames.length === 0) {
//     namesCard.innerHTML = "<p class='name-card'>No names found.</p>";
//     return;
//   }

//   // Show matched results
//   filteredNames.forEach((name) => {
//     namesCard.innerHTML += `
//       <div class="name-card">
//         <h2 class="name">${name.name_en}</h2> |
//         <h2 class="name">${name.name_ur}</h2>
//         <button class='details-btn' data-id="${name.id}">More Details</button>
//       </div>`;
//   });
// });


// ✅ 1. CONNECTION WITH FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBi79vA2god6khEWReMp2oUyUN_9ojkKA8",
  authDomain: "islamic-names-website.firebaseapp.com",
  projectId: "islamic-names-website",
  storageBucket: "islamic-names-website.firebasestorage.app",
  messagingSenderId: "1047190063212",
  appId: "1:1047190063212:web:8ae012321185e15c457049",
  measurementId: "G-E2X1E5YRZC",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ 2. FETCH NAMES FOR MAIN SECTION (cards)
async function fetchNames() {
  try {
    const names = await getDocs(collection(db, "names"));
    const card = document.getElementById("namesSection");
    card.innerHTML = "";

    names.forEach((name) => {
      const { name_en, name_ur, meaning_en, meaning_ur } = name.data();

      card.innerHTML += `
        <div class="name-card">
          <div class="accordion-toggle">
            <h2 class="name">🔤 ${name_en}</h2>
            <p class="meaning">📖 ${meaning_en}</p>
            <hr />
            <span class="ur_content" dir="rtl">
              <h2 class="name">🔠 ${name_ur}</h2>
              <p class="meaning">📚 ${meaning_ur}</p>
            </span>
          </div>
          <button class="details-btn" data-id="${name.id}">More Details</button>
        </div>`;
    });
  } catch (error) {
    // console.error("Error fetching names:", error);
  }
}
fetchNames();


// ✅ 3. SEARCH FUNCTIONALITY
const namesArray = [];

async function loadNamesToArray() {
  try {
    const snapshot = await getDocs(collection(db, "names"));
    snapshot.forEach((doc) => {
      const data = doc.data();
      namesArray.push({
        id: doc.id,
        name_en: data.name_en.toLowerCase(),
        name_ur: data.name_ur.toLowerCase(),
        meaning_en: data.meaning_en,
        meaning_ur: data.meaning_ur,
      });
    });
  } catch (error) {
    console.error("Error loading names for search:", error);
  }
}
await loadNamesToArray(); // load data at start

// ✅ 4. SEARCH IN LIST BELOW INPUT (like dropdown result)
const resultsList = document.getElementById("resultsList");
const searchInput = document.getElementById("searchInput");

if (resultsList && searchInput) {
  searchInput.addEventListener("keyup", function () {
    const searchValue = this.value.toLowerCase();
    resultsList.innerHTML = "";

    if (searchValue) {
      const filtered = namesArray.filter((item) =>
        item.name_en.includes(searchValue) || item.name_ur.includes(searchValue)
      );
      filtered.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.name_en} | ${item.name_ur}`;
        resultsList.appendChild(li);
      });

      if (filtered.length === 0) {
        resultsList.innerHTML = "<li>No names found</li>";
      }
    }
  });
}

// ✅ 5. FETCH & DISPLAY ALL NAMES IN A SECTION
async function fetchAllNames() {
  try {
    const names = await getDocs(collection(db, "names"));
    const namesCard = document.getElementById("allNamesSection");
    namesCard.innerHTML = "";

    names.forEach((doc) => {
      const data = doc.data();
      namesCard.innerHTML += `
        <div class="name-card">
          <h2 class="name">${data.name_en}</h2> |
          <h2 class="name">${data.name_ur}</h2>
          <button class="details-btn" data-id="${doc.id}">More Details</button>
        </div>`;
    });
  } catch (error) {
    console.error("Error fetching all names:", error);
  }
}
fetchAllNames();

// ✅ 6. SEARCH IN "All Names" SECTION
document.getElementById("allNamesSearchInput").addEventListener("keyup", function () {
  const searchValue = this.value.toLowerCase();
  const namesCard = document.getElementById("allNamesSection");
  const alphabets = document.getElementsByClassName("alphabets"); // alphabets کی id ہونی چاہیے
  
  namesCard.innerHTML = "";
  for (let i = 0; i < alphabets.length; i++) {
    alphabets[i].style.display = "none";
  }

  if (!searchValue) {
    fetchAllNames();
    for (let i = 0; i < alphabets.length; i++) {
      alphabets[i].style.display = "block";
    }
    return;
  }

  const filtered = namesArray.filter(
    (item) =>
      item.name_en.includes(searchValue) || item.name_ur.includes(searchValue)
  );

  if (filtered.length === 0) {
    namesCard.innerHTML = "<p class='name-card'>No names found.</p>";
    return;
  }

  filtered.forEach((name) => {
    namesCard.innerHTML += `
      <div class="name-card">
        <h2 class="name">${name.name_en}</h2> |
        <h2 class="name">${name.name_ur}</h2>
        <button class="details-btn" data-id="${name.id}">More Details</button>
      </div>`;
  });
});
