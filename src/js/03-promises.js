import Notiflix from "notiflix";

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const delayInput = document.getElementsByName("delay");
const stepInput = document.getElementsByName("step");
const amountInput = document.getElementsByName("amount");

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let delay = Number(delayInput[0].value);
  const step = Number(stepInput[0].value);
  const amount = Number(amountInput[0].value);
  for (let i = 0; i < amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay = delay + step;
  }
});
