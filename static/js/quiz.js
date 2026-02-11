// document.addEventListener("DOMContentLoaded", function () {
//   const submitButton = document.getElementById("submit-quiz");
//   const feedbackText = document.getElementById("quiz-feedback");
//   const musicFrame = document.getElementById("music-frame");
//   const resultsContainer = document.getElementById("quiz-results");

//   submitButton.addEventListener("click", function () {
//       const answers = document.querySelectorAll("input[type=radio]:checked");
//       if (answers.length < 5) {
//           alert("Please answer all questions before submitting!");
//           return;
//       }

//       let score = 0;
//       answers.forEach((answer) => {
//           if (answer.value === "high") score += 3;
//           if (answer.value === "medium") score += 2;
//           if (answer.value === "low") score += 1;
//       });

//       let feedback = "";
//       let musicUrl = "";

//       if (score >= 12) {
//           feedback = "You may be experiencing high levels of stress or emotional distress. Consider taking a break and practicing self-care. 💙";
//           musicUrl = "https://open.spotify.com/embed/playlist/37i9dQZF1DX3YSRoSdA634"; // Calming & Relaxing Music

//       } else if (score >= 8) {
//           feedback = "You seem to be doing okay, but some stress and mood swings are present. Keep practicing mindfulness. 🌿";
//           musicUrl = "https://www.youtube.com/embed/2OEL4P1Rz04"; // Guided Meditation

//       } else {
//           feedback = "You're in a good mental space! Keep maintaining healthy habits. ✨";
//           musicUrl = "https://open.spotify.com/embed/playlist/37i9dQZF1DWXnexX7n4bmq"; // Happy & Motivational Music
//       }

//       feedbackText.textContent = feedback;
//       musicFrame.src = musicUrl;
//       resultsContainer.style.display = "block"; // Show results section
//   });
// });



// Uses DOMContentLoaded to ensure the script runs only after the page is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submit-quiz"); //The button to submit the quiz.
    const feedbackText = document.getElementById("quiz-feedback"); //Displays feedback based on the score.
    const musicFrame = document.getElementById("music-frame"); //Embeds a song/video for relaxation.
    const resultsContainer = document.getElementById("quiz-results"); //The container where results appear.
  
    submitButton.addEventListener("click", function () {
        const answers = document.querySelectorAll("input[type=radio]:checked");
        if (answers.length < 5) {
            alert("Please answer all questions before submitting!");
            return;
        }

//   It checks if all questions are answered. If not, it shows an alert.
        let score = 0;
        answers.forEach((answer) => {
            if (answer.value === "high") score += 3;
            if (answer.value === "medium") score += 2;
            if (answer.value === "low") score += 1;
        });
  
        let feedback = "";
        let musicOptions = [];  // Array to store multiple music options
  
        if (score >= 12) {
            feedback = "You may be experiencing high levels of stress or emotional distress. Consider taking a break and practicing self-care. 💙";
            musicOptions = [
                "https://open.spotify.com/embed/playlist/37i9dQZF1DX3YSRoSdA634", // Calming Music
                "https://www.youtube.com/embed/1ZYbU82GVz4", // Deep Sleep Music
                "https://www.youtube.com/embed/y3n-rHy7EJo"  // Stress Relief Meditation
            ];
  
        } else if (score >= 8) {
            feedback = "You seem to be doing okay, but some stress and mood swings are present. Keep practicing mindfulness. 🌿";
            musicOptions = [
                "https://www.youtube.com/embed/2OEL4P1Rz04", // Guided Meditation
                "https://open.spotify.com/embed/playlist/37i9dQZF1DX9XIFQuFvzM4", // Chill Lo-Fi
                "https://www.youtube.com/embed/O-6f5wQXSu8"  // Relaxing Nature Sounds
            ];
  
        } else {
            feedback = "You're in a good mental space! Keep maintaining healthy habits. ✨";
            musicOptions = [
                "https://open.spotify.com/embed/playlist/37i9dQZF1DWXnexX7n4bmq", // Happy Music
                "https://www.youtube.com/embed/d-diB65scQU", // Upbeat Motivation Music
                "https://open.spotify.com/embed/playlist/37i9dQZF1DX1BzILRveYHb"  // Feel-Good Indie Music
            ];
        }

        // Uses Math.random() to pick a random link from multiple options.
        let randomMusic = musicOptions[Math.floor(Math.random() * musicOptions.length)];
  
        // Updates the musicFrame to play the selected song/video.
        feedbackText.textContent = feedback;
        musicFrame.src = randomMusic;
        
        // Shows feedback and the embedded music/video.
        resultsContainer.style.display = "block"; // Show results section
    });
  });
  