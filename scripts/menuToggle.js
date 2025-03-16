document.getElementById("hamburger-menu").addEventListener("click", function () {
    const nav = document.getElementById("main-nav");
    nav.classList.toggle("open");

    // Change the button text
    this.textContent = nav.classList.contains("open") ? "✖" : "☰";
});