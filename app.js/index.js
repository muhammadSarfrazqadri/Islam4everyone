// ✅ 1. CONNECTION WITH FIREBASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
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
          <a class="details-btn" id="${name.id}" href="htmls/nameDetails.html?id=${name.id}">More Details</a>
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
          <button class="details-btn" id="${doc.id}" href="/htmls/nameDetails.html?id=${doc.id}">More Details</button>
        </div>`;
    });
  } catch (error) {
    // console.error("Error fetching all names:", error);
  }
}
fetchAllNames();

// ✅ 6. HANDLE CLICK ON DETAILS BUTTON

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("details-btn")) {
    const nameId = event.target.getAttribute("id");
    if (nameId) {
      // ✅ Go to details page with id in URL
      window.location.href = `../htmls/nameDetails.html?id=${nameId}`;
    }
  }
});
