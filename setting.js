const STORAGE_KEY = "pomodoroMinutes";
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const minutesInput = document.getElementById("timer-minutes");
const saveBtn = document.getElementById("save-btn");

function isValidMinutes(value) {
  if (value === "") return false;
  const minutes = Number(value);
  return Number.isInteger(minutes) && minutes >= MIN_MINUTES && minutes <= MAX_MINUTES;
}

function updateSaveBtnState() {
  saveBtn.disabled = !isValidMinutes(minutesInput.value);
}

const storedMinutes = Number(localStorage.getItem(STORAGE_KEY));
minutesInput.value = storedMinutes >= MIN_MINUTES && storedMinutes <= MAX_MINUTES ? storedMinutes : 25;

updateSaveBtnState();

minutesInput.addEventListener("input", updateSaveBtnState);

saveBtn.addEventListener("click", () => {
  if (!isValidMinutes(minutesInput.value)) return;
  localStorage.setItem(STORAGE_KEY, minutesInput.value);
  location.href = "index.html";
});
