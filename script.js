// DOM Elements
const targetDateInput = document.getElementById("targetDateInput");
const setDateBtn = document.getElementById("setDateBtn");
const targetDateDisplay = document.getElementById("targetDateDisplay");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const messageEl = document.getElementById("message");

// Set default target date (New Year 2025)
let targetDate = new Date("January 1, 2025 00:00:00").getTime();
updateTargetDateDisplay();

// Set minimum date to current date
const now = new Date();
const minDate = now.toISOString().slice(0, 16);
targetDateInput.min = minDate;

// Set initial input value to default target date
const defaultDate = new Date(targetDate);
targetDateInput.value = defaultDate.toISOString().slice(0, 16);

// Update target date display
function updateTargetDateDisplay() {
  const date = new Date(targetDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  targetDateDisplay.textContent = date.toLocaleDateString("en-US", options);
}

// Format time value to always have two digits
function formatTime(value) {
  return value < 10 ? `0${value}` : value;
}

// Update countdown
function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // Check if countdown has ended
  if (distance < 0) {
    clearInterval(countdownInterval);
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    messageEl.textContent = "Countdown Finished!";
    return;
  }

  // Calculate time units
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update Display
  daysEl.textContent = formatTime(days);
  hoursEl.textContent = formatTime(hours);
  minutesEl.textContent = formatTime(minutes);
  secondsEl.textContent = formatTime(seconds);

  // Clear message when countdown is active
  messageEl.textContent = "";
}

// Set new target date
setDateBtn.addEventListener("click", () => {
  const inputDate = new Date(targetDateInput.value).getTime();
  const now = new Date().getTime();

  if (inputDate <= now) {
    messageEl.textContent = "Please select a future date.";
    return;
  }

  targetDate = inputDate;
  updateTargetDateDisplay();
  updateCountdown();

  // Clear old interval and start a new one
  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 1000);
});

// Initialize countdown
countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
