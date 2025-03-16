document.getElementById("dark-mode-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Change button text
    this.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});