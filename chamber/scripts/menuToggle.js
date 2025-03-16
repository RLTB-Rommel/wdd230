document.getElementById("hamburger-menu").addEventListener("click", function () {
    const nav = document.getElementById("main-nav");
    nav.classList.toggle("open");
    this.textContent = nav.classList.contains("open") ? "✖" : "☰";
});