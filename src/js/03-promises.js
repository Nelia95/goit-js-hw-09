import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formRef = document.querySelector('.form');

formRef.addEventListener('submit', event => {
  preventDefault();
  const {
    elements: { delay, amount, step },
  } = event.currentTarget;

  for (let i = 0; i <= Number(amount.value); i += 1) {
    const positionEl = i + 1;
    const delayEl = Number(delay.value) + i * Number(step.value);
    createPromise(positionEl, delayEl)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
