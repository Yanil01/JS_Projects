// variables for buttons

const startStopBtn = document.querySelector("#startStopBtn");
const resetBtn = document.querySelector("#resetBtn");

// variables for time values

let seconds = 0;
let minutes = 0;
let hours = 0;

// variables for leading zero

let leadingSeconds = 0;
let leadingMinutes = 0;
let leadingHours = 0;

// variables for set interval & timer status

let timerInterval = null;
let timerStatus = "stopped";

// Stop Watch function

function stopWatch() {
  seconds++; // Increment seconds

  // Update minutes if seconds reach 60
  if (seconds / 60 === 1) {
    seconds = 0;
    minutes++;
    // Update hours if minutes reach 60
    if (minutes / 60 === 1) {
      minutes = 0;
      hours++;
    }
  }

  // Add leading zeros to single digit values
  if (seconds < 10) {
    leadingSeconds = "0" + seconds.toString();
  } else {
    leadingSeconds = seconds;
  }
  if (minutes < 10) {
    leadingMinutes = "0" + minutes.toString();
  } else {
    leadingMinutes = minutes;
  }
  if (hours < 10) {
    leadingHours = "0" + hours.toString();
  } else {
    leadingHours = hours;
  }

  // Update timer display with formatted time
  let displayTimer = (document.getElementById("timer").innerText =
    leadingHours + ":" + leadingMinutes + ":" + leadingSeconds);
}

// Event listener for start/stop button
startStopBtn.addEventListener("click", function () {
  if (timerStatus === "stopped") {
    // Start the timer
    timerInterval = window.setInterval(stopWatch, 1000); // Run stopWatch function every second
    startStopBtn.innerHTML = '<i class="fas fa-pause" id="pause"></i>'; // Change button icon to pause
    timerStatus = "started"; // Update timer status
  } else {
    // Pause the timer
    window.clearInterval(timerInterval); // Stop the interval
    startStopBtn.innerHTML = '<i class="fas fa-play" id="play"></i>'; // Change button icon to play
    timerStatus = "stopped"; // Update timer status
  }
});

// Event listener for reset button
resetBtn.addEventListener("click", function () {
  window.clearInterval(timerInterval); // Stop the interval
  // Reset timer values and display
  seconds = 0;
  minutes = 0;
  hours = 0;
  document.getElementById("timer").innerHTML = "00:00:00"; // Reset timer display
});
