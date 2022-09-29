import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timerRef = document.querySelector('.timer');
const inputRef = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
btnStart.disabled = true;
const refs = {};
let time = 0;
let startTime = 0;
let timerId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    // const delta = selectedDates[0].getTime() - Date.now();
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    btnStart.disabled = false;
    btnStart.addEventListener('click', () => {
      startTime = selectedDates[0];
      console.log(startTime);
      // this.getRefs(rootSelector);
      this.timerId = setInterval(() => {
        const ms = startTime.getTime() - Date.now();
        console.log(ms);
        if (ms <= 1000) {
          clearInterval(this.timerId);
          const data = this.convertMs(ms);
          Object.entries(data).forEach(([name, value]) => {
            this.refs[name].textContent = this.addLeadinZero(value);
          });
        }
      }, 1000);
    });
    // time = selectedDates[0].getTime();
    // return time;
  },
  // getRefs(rootSelector) {
  //   this.refs.days = rootSelector.querySelector('span[data-days]');
  //   this.refs.hours = rootSelector.querySelector('span[data-hours]');
  //   this.refs.minutes = rootSelector.querySelector('span[data-minutes]');
  //   this.refs.seconds = rootSelector.querySelector('span[data-seconds]');
  // },
};
const inputFl = flatpickr(inputRef, options);

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

console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));
