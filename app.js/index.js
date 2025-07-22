// CONNECTION WITH FIREBASE

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

// FIREBASE CONNECTED SUCCESSFULLY

// FETCHING DATA FOR CARDS

async function fetchNames() {
  try {
    const names = await getDocs(collection(db, "names"));
    names.forEach((name) => {
      const { name_en, name_ur, meaning_en, meaning_ur } = name.data();
      console.log(name_en, name_ur, meaning_en, meaning_ur);
      const namesSection = document.getElementsByClassName('names-section')[0];
      if (namesSection) {
        namesSection.innerHTML += `
        <div class="name-card">
          <div class="accordion-toggle">
          <h2 class="name">🔤 ${name_en}</h2>
          <p class="meaning">📖 ${meaning_en}</p>
        <hr />
        <span class='ur_content' dir="rtl">
          <h2 class="name">🔠 ${name_ur}</h2>
          <p class="meaning">📚 ${meaning_ur}</p>
        </span>
    </div>`;
      }
    });
  } catch (error) {
    console.error("Error fetching names:", error);
  }
}
fetchNames();