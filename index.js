const DEFAULT_MINUTES = 20;
const STORAGE_KEY = "pomodoroMinutes";

function getStoredMinutes() {
  const stored = Number(localStorage.getItem(STORAGE_KEY));
  return stored >= 1 && stored <= 60 ? stored : DEFAULT_MINUTES;
}

let remainingSeconds = getStoredMinutes() * 60;
let timerId = null;

const timeDisplay = document.getElementById("time-display");

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingSeconds);
}

function startTimer() {
  if (timerId !== null) return;

  timerId = setInterval(() => {
    if (remainingSeconds <= 0) {
      stopTimer();
      return;
    }
    remainingSeconds--;
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  stopTimer();
  remainingSeconds = getStoredMinutes() * 60;
  updateDisplay();
}

updateDisplay();
