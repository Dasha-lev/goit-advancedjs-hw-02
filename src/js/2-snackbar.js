// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const delayInput = form.elements.delay;
const stateInputs = form.elements.state;

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            state === "fulfilled" ? resolve(delay) : reject(delay);
        }, delay);
    });
}

function showNotification(type, delay) {
    const message = type === "success"
        ? `✅ Fulfilled promise in ${delay}ms`
        : `❌ Rejected promise in ${delay}ms`;

    iziToast[type]({
        title: type === "success" ? "Success" : "Error",
        message,
        position: "topRight", 
        timeout: 5000,
        closeOnClick: true,
    });
}

function handleSubmit(event) {
    event.preventDefault();

    const delay = parseInt(delayInput.value, 10);
    const state = [...stateInputs].find(input => input.checked)?.value;

    if (!state) {
        showNotification("error", "Please select a state");
        return;
    }

    createPromise(delay, state)
        .then(delay => showNotification("success", delay))
        .catch(delay => showNotification("error", delay));
}

form.addEventListener("submit", handleSubmit);
