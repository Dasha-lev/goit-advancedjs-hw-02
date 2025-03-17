// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const dateTimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");


let userSelectedDate = null;
let timerInterval = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);

       
        const selectedDate = selectedDates[0];

        if (selectedDate <= new Date()) {
            
            iziToast.error({
                title: "Error",
                message: "Please choose a date in the future",
                position: "topRight",
                timeout: 5000,
                closeOnClick: true
            });
            startButton.disabled = true;
        } else {
            
            userSelectedDate = selectedDate;
            startButton.disabled = false;
        }
    }
};


flatpickr(dateTimePicker, options);

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
    return String(value).padStart(2, "0");
}

function updateTimerDisplay(time) {
    daysSpan.textContent = addLeadingZero(time.days);
    hoursSpan.textContent = addLeadingZero(time.hours);
    minutesSpan.textContent = addLeadingZero(time.minutes);
    secondsSpan.textContent = addLeadingZero(time.seconds);
}

function startTimer() {
    startButton.disabled = true;
    dateTimePicker.disabled = true;

    timerInterval = setInterval(() => {
        const currentTime = new Date();
        const timeLeft = userSelectedDate - currentTime;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            dateTimePicker.disabled = false;
            return;
        }

        updateTimerDisplay(convertMs(timeLeft));
    }, 1000);
}

startButton.addEventListener("click", startTimer);
