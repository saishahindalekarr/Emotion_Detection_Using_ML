document.addEventListener("DOMContentLoaded", function () {
  const readMoreButtons = document.querySelectorAll(".read-more");
  const closeButtons = document.querySelectorAll(".close-article");
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  // Expand the selected article when "Read More" is clicked
  readMoreButtons.forEach(button => {
      button.addEventListener("click", function () {
          const target = document.getElementById(button.dataset.target);
          target.style.display = "block";
          window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      });
  });

  // Close the expanded article when "Close" is clicked
  closeButtons.forEach(button => {
      button.addEventListener("click", function () {
          button.parentElement.style.display = "none";
      });
  });

  // Dark Mode Toggle Feature
  darkModeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");

      // Save user preference in localStorage
      if (document.body.classList.contains("dark-mode")) {
          localStorage.setItem("darkMode", "enabled");
      } else {
          localStorage.setItem("darkMode", "disabled");
      }
  });

  // Load the user's dark mode preference
  if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark-mode");
  }
});
