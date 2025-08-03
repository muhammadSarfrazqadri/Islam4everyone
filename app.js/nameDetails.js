import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Firebase config
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

// Elements
const spinner = document.getElementById("loading-spinner");
const container = document.getElementById("nameDetailsContainer");

// Async function to load data
async function loadNameDetails() {
  const params = new URLSearchParams(window.location.search);
  const nameId = params.get("id");

  if (nameId) {
    const docRef = doc(db, "names", nameId);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById("name_en").innerText = data.name_en || "";
        document.getElementById("name_ur").innerText = data.name_ur || "";
        document.getElementById("meaning_en").innerText = data.meaning_en || "";
        document.getElementById("meaning_ur").innerText = data.meaning_ur || "";
        document.getElementById("gender").innerText = data.gender || "";
        document.getElementById("origin").innerText = data.origin || "";
        document.getElementById("is_quranic").innerText = data.is_quranic ? "ہاں" : "نہیں";

        spinner.style.display = "none";
        container.style.display = "block";
      } else {
        spinner.innerHTML = "<h2>کوئی ریکارڈ نہیں ملا</h2>";
        spinner.style.display = "block";
        container.style.display = "none";
      }
    } catch (error) {
      console.error("Error loading document:", error);
      setTimeout(() => {
        spinner.style.display = "none";
        container.innerHTML = "<h3>🚫Something Error🚫</h3>"
        container.style.display = "block"
        container.style.textAlign = "center"
      }, 10000);
    }
  } else {
    document.body.innerHTML = "<h2>URL میں کوئی ID موجود نہیں</h2>";
  }
}

// Start loading
loadNameDetails();