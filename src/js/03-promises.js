import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formRef = document.querySelector('.form');
const amountEl = document.getElementsByName('amount');
const delayEl = document.getElementsByName('delay');
const stepEl = document.getElementsByName('step');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

formRef.addEventListener('submit', () => {
  preventDefault();

  for (let i = 0; i <= Number(amountEl.value); i += 1) {
    createPromise(i, delayEl.value)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    Number(delayEl.value) + Number(stepEl.value);
  }
});
