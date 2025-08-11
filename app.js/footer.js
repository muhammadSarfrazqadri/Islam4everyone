const footer = document.getElementById("footer");
window.addEventListener("scroll", () => {
  const rect = footer.getBoundingClientRect();
  if (rect.top < window.innerHeight - 50) {
    footer.classList.add("show");
  }
});
