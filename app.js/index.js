import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
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

async function fetchNames() {
  try {
    const names = await getDocs(collection(db, "names"));
    names.forEach((name) => {
      const { name_en, name_ur, meaning_en, meaning_ur } = name.data();
      console.log(name_en, name_ur, meaning_en, meaning_ur);
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
    });
  } catch (error) {
    console.error("Error fetching names:", error);
  }
}
fetchNames();





// ADDING DATA 

async function addData() {
  await setDoc(doc(db, "names", "name_id"),  {
    "id": "hira",
    "name_en": "Hira",
    "name_ur": "حرا",
    "meaning_en": "A mountain, Name of a cave",
    "meaning_ur": "ایک پہاڑ، غار کا نام",
    "details_en": "Hira means 'A mountain' or 'Name of a cave'. It is a beautiful name for girls.",
    "details_ur": "حرا کا مطلب ہے 'ایک پہاڑ' یا 'غار کا نام'۔ یہ لڑکیوں کے لیے ایک خوبصورت نام ہے۔",
    "arabic_spelling": "حرا",
    "pronunciation_en": "Hi-ra",
    "pronunciation_ur": "حرا",
    "gender_en": "Girl",
    "gender_ur": "لڑکی",
    "origin_en": "Arabic",
    "origin_ur": "عربی",
    "religion_en": "Islam",
    "religion_ur": "اسلام",
    "quran_en": "Not mentioned in Quran, but is the name of a cave where Prophet Muhammad (PBUH) received the first revelation.",
    "quran_ur": "قرآن میں ذکر نہیں، لیکن یہ غار کا نام ہے جہاں حضرت محمد ﷺ کو پہلی وحی ملی۔",
    "related_en": "Hina, Hira, Hira",
    "related_ur": "حنا، حرا، حرا"
  });
}

addData().then(() => {
  console.log("Data added successfully!");
}).catch((error) => {
  console.error("Error adding data:", error);
});

//   function addAccordionListeners() {
//     const cards = document.querySelectorAll(".name-card");
//     cards.forEach((card) => {
//       const toggle = card.querySelector(".accordion-toggle");
//       toggle.addEventListener("click", () => {
//         cards.forEach((c) => {
//           if (c !== card) c.classList.remove("active");
//         });
//         card.classList.toggle("active");
//       });
//     });
//   }

//   function addDetailsBtnListeners() {
//     const detailsButtons = document.querySelectorAll(".details-btn");
//     detailsButtons.forEach((btn) => {
//       btn.addEventListener("click", () => {
//         const id = btn.dataset.id;
//         const selectedName = namesData.find((n) => n.id == id);
//         showDetailsModal(selectedName);
//       });
//     });
//   }

//   function showDetailsModal(nameObj) {
//     let modal = document.getElementById("detailsModal");
//     if (!modal) {
//       modal = document.createElement("div");
//       modal.id = "detailsModal";
//       modal.innerHTML = `
//         <div class="modal-backdrop"></div>
//         <div class="modal-content">
//           <button class="modal-close">&times;</button>
//           <h2 class="modal-title"></h2>
//           <p class="modal-meaning"></p>
//           <p class="modal-id"></p>
//         </div>
//       `;
//       document.body.appendChild(modal);
//     }

//     modal.querySelector(".modal-title").textContent = nameObj.name_en;
//     modal.querySelector(".modal-meaning").textContent = nameObj.meaning_en;
//     modal.querySelector(".modal-id").textContent = "ID: " + nameObj.id;

//     modal.style.display = "block";
//     document.body.classList.add("modal-open");

//     modal.querySelector(".modal-close").onclick =
//       modal.querySelector(".modal-backdrop").onclick = () => {
//         modal.style.display = "none";
//         document.body.classList.remove("modal-open");
//       };
//   }

//   if (moreNamesBtn) {
//     moreNamesBtn.addEventListener("click", () => {
//       window.location.href = "htmls/allnames.html";
//     });
//   }

//   if (searchInput) {
//     searchInput.addEventListener("input", function () {
//       const filter = this.value.toLowerCase();
//       const filtered = namesData.filter(
//         (name) =>
//           name.name_en.toLowerCase().includes(filter) ||
//           name.meaning_en.toLowerCase().includes(filter)
//       );
//       renderNames(filtered);
//     });
//   }
// });
