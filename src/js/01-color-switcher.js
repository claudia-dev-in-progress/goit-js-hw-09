function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startButton = document.querySelector("[data-start]");
const stopButton = document.querySelector("[data-stop]");

let timerId = null;

startButton.addEventListener("click", () => {
  if (timerId !== null) {
    return;
  }
  timerId = setInterval(setBodyBackground, 1000);
});

stopButton.addEventListener("click", () => {
  if (timerId !== null) {
    clearInterval(timerId);
  }
});

function setBodyBackground() {
  const randomCollor = getRandomHexColor();
  document.body.style = `background-color: ${randomCollor}`;
}
