const prevArrow = document.getElementById("prevArrow");
const nextArrow = document.getElementById("nextArrow");
const namesSection = document.getElementById("namesSection");

function scrollByCard(direction = "next") {
  const card = namesSection.querySelector(".name-card");
  if (!card) return;

  const cardWidth = card.offsetWidth + 24;

  namesSection.scrollBy({
    left: direction === "next" ? cardWidth : -cardWidth,
    behavior: "smooth",
  });

  // Optional: Auto-loop back when reaching end
  const scrollLeft = namesSection.scrollLeft;
  const maxScrollLeft = namesSection.scrollWidth - namesSection.clientWidth;

  if (direction === "next" && scrollLeft >= maxScrollLeft - cardWidth) {
    // Scroll back to start
    setTimeout(() => {
      namesSection.scrollTo({ left: 0, behavior: "smooth" });
    }, 600); // wait till scroll ends
  }
}

nextArrow.addEventListener("click", () => scrollByCard("next"));
prevArrow.addEventListener("click", () => scrollByCard("prev"));


setInterval(() => {
  scrollByCard("next");
}, 3000);