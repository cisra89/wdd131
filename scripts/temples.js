// Footer dates
const yearSpan = document.getElementById("year");
const modifiedSpan = document.getElementById("modified");

yearSpan.textContent = new Date().getFullYear();
modifiedSpan.textContent = document.lastModified;

// Hamburger Menu
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");

  if (menuBtn.textContent === "☰") {
    menuBtn.textContent = "✖";
  } else {
    menuBtn.textContent = "☰";
  }
});
