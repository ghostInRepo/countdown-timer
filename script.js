// Set minimum date to current date
const now = new Date();
const minDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, 16);
document.getElementById("customDate").min = minDate;

// Default target date (December 31, 2025 23:59:59)
let targetDate = new Date("December 31, 2025 23:59:59").getTime();

// DOM elements
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const completionMessage = document.getElementById("completionMessage");
const targetDateDisplay = document.getElementById("targetDateDisplay");
const customDateInput = document.getElementById("customDate");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

// Format number to two digits
function formatNumber(num) {
  return num < 10 ? `0${num}` : num;
}

// Update countdown display
function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    // Countdown finished
    clearInterval(countdownInterval);
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    completionMessage.style.display = "block";
    return;
  }

  // Calculate time units
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update display with animation
  updateWithAnimation(daysElement, formatNumber(days));
  updateWithAnimation(hoursElement, formatNumber(hours));
  updateWithAnimation(minutesElement, formatNumber(minutes));
  updateWithAnimation(secondsElement, formatNumber(seconds));

  // Hide completion message if it was shown
  completionMessage.style.display = "none";
}

// Update element with flip animation
function updateWithAnimation(element, newValue) {
  if (element.textContent !== newValue) {
    element.classList.remove("flip");
    // Trigger reflow
    void element.offsetWidth;
    element.textContent = newValue;
    element.classList.add("flip");
  }
}

// Set target date display
function setTargetDateDisplay() {
  const date = new Date(targetDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  targetDateDisplay.textContent = date.toLocaleString("en-US", options);
}

// Initialize countdown
let countdownInterval = setInterval(updateCountdown, 1000);
setTargetDateDisplay();
updateCountdown();

// Event listeners
startButton.addEventListener("click", () => {
  const customDateValue = customDateInput.value;
  if (!customDateValue) {
    alert("Please select a date and time");
    return;
  }

  // Convert to timestamp
  targetDate = new Date(customDateValue).getTime();

  // Validate date is in the future
  if (targetDate <= new Date().getTime()) {
    alert("Please select a future date and time");
    return;
  }

  setTargetDateDisplay();
  updateCountdown();

  // Restart interval
  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 1000);
});

resetButton.addEventListener("click", () => {
  // Reset to default date
  targetDate = new Date("December 31, 2025 23:59:59").getTime();
  customDateInput.value = "";
  setTargetDateDisplay();
  updateCountdown();

  // Restart interval
  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 1000);
});
