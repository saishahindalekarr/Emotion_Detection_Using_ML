// Ensures the script runs only after the webpage is fully loaded.
document.addEventListener("DOMContentLoaded", function () {

    // Displays text like "Inhale...", "Hold...", and "Exhale...".
  const breathingText = document.getElementById("breathing-text");

//   A visual animation (expanding and shrinking) to guide breathing.
  const breathingCircle = document.querySelector(".breathing-circle");

//   Button to start/restart the exercise.
  const startButton = document.getElementById("start-breathing");

  let cycleCount = 0;

  function startBreathingExercise() {
      startButton.style.display = "none"; // Hide start button when exercise begins

    //   cycleCount keeps track of how many cycles have been completed.
      cycleCount = 0;
      breatheIn();
  }

  function breatheIn() {
      breathingText.textContent = "Inhale...";
      breathingCircle.style.transform = "scale(1.4)";
      breathingCircle.style.backgroundColor = "#5ac18e"; // Soft green

    //   After 4 seconds, the next phase begins.
      setTimeout(holdBreath, 4000);
  }

  function holdBreath() {
      breathingText.textContent = "Hold...";
      breathingCircle.style.backgroundColor = "#f7d04b"; // Yellow

    //   After 4 seconds, moves to exhale phase.
      setTimeout(exhale, 4000);
  }

  function exhale() {
      breathingText.textContent = "Exhale...";
      breathingCircle.style.transform = "scale(1)";
      breathingCircle.style.backgroundColor = "#ff6f61"; // Soft red

      cycleCount++;

    //   If less than 3 cycles are completed, the function repeats (breatheIn() starts again).
      if (cycleCount < 3) {
          setTimeout(breatheIn, 4000);
      } else {

        // After 3 cycles, it displays a success message and shows the Restart button.
          breathingText.textContent = "Great Job! 🎉";
          startButton.style.display = "block";
          startButton.textContent = "Restart";
      }
  }

//   When the button is clicked, it starts the breathing exercise.
  startButton.addEventListener("click", startBreathingExercise);
});
