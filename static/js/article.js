document.addEventListener("DOMContentLoaded", function () {
  const readMoreButtons = document.querySelectorAll(".read-more");
  const closeButtons = document.querySelectorAll(".close-article");
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  // Read More / Expand Sections
  readMoreButtons.forEach(button => {
      button.addEventListener("click", function () {
          const target = document.getElementById(button.dataset.target);
          target.style.display = "block";
          window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      });
  });

  // Close Articles
  closeButtons.forEach(button => {
      button.addEventListener("click", function () {
          button.parentElement.style.display = "none";
      });
  });

  // Dark Mode
  darkModeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
  });
});
