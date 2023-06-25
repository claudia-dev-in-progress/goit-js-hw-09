import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (currentDate.getTime() - selectedDates[0].getTime() >= 0) {
      window.alert("Please choose a date in the future");
    } else {
      startButton.disabled = false;
      selectedDate = selectedDates[0];
    }
  },
};

const fp = flatpickr("#datetime-picker", options);
const startButton = document.querySelector("[data-start]");
startButton.disabled = true;
let selectedDate = null;
let timerId = null;

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  const datetimepicker = document.querySelector("#datetime-picker");
  datetimepicker.disabled = true;
  setInterval(updateDateValues, 1000);
});

function updateDateValues() {
  const currentDate = new Date();
  const msDfference = selectedDate.getTime() - currentDate.getTime();
  const { days, hours, minutes, seconds } = convertMs(msDfference);

  const dataDays = document.querySelector("[data-days]");
  const dataHours = document.querySelector("[data-hours]");
  const dataMinutes = document.querySelector("[data-minutes]");
  const dataSeconds = document.querySelector("[data-seconds]");

  if (msDfference <= 0) {
    dataDays.textContent = "00";
    dataHours.textContent = "00";
    dataMinutes.textContent = "00";
    dataSeconds.textContent = "00";
    enableUiElements();
  } else {
    if (days < 10) {
      dataDays.textContent = addLeadingZero(days);
    } else {
      dataDays.textContent = days;
    }
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
  }
}

function enableUiElements() {
  const datetimepicker = document.querySelector("#datetime-picker");
  datetimepicker.disabled = false;
  clearInterval(timerId);
  timerId = null;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value >= 10) {
    return value.toString();
  }

  return value.toString().padStart(2, "0");
}
