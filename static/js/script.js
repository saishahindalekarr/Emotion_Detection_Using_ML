// original script js code

// document.addEventListener("DOMContentLoaded", function () {
//   const webcamImage = document.getElementById("webcam-feed");
//   if (webcamImage) {
//       webcamImage.src = "/video_feed";
//   } else {
//       console.error("Webcam feed not found!");
//   }
// });



// new script js code for toggle button for the webcam
document.addEventListener("DOMContentLoaded", function () {
  const webcamContainer = document.getElementById("webcam-container");
  const toggleWebcamBtn = document.getElementById("toggle-webcam");
  const webcamFeed = document.getElementById("webcam-feed");

  let isWebcamOn = false;

  toggleWebcamBtn.addEventListener("click", function () {
      if (isWebcamOn) {
          webcamContainer.style.display = "none";
          toggleWebcamBtn.textContent = "Start Webcam";
          webcamFeed.src = "";  // Stop the feed

      } else {
          webcamContainer.style.display = "block";
          toggleWebcamBtn.textContent = "Stop Webcam";
          webcamFeed.src = "/video_feed";  // Start the feed

      }
      isWebcamOn = !isWebcamOn;
  });
});



