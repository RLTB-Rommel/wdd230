// Footer year and last modified date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last modified: " + document.lastModified;

// Banner logic
const banner = document.getElementById("meet-banner");
const closeBtn = document.getElementById("close-banner");

const today = new Date().getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

if ([1, 2, 3].includes(today)) {
  banner.classList.remove("hidden");
}

closeBtn.addEventListener("click", () => {
  banner.style.display = "none";
});