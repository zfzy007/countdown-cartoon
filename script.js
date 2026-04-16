const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const titleEl = document.getElementById('title');
const eventNameInput = document.getElementById('event-name');
const targetDateInput = document.getElementById('target-date');
const setBtn = document.getElementById('set-btn');

let countdownInterval;

function updateCountdown(targetDate) {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        daysEl.innerText = '00';
        hoursEl.innerText = '00';
        minutesEl.innerText = '00';
        secondsEl.innerText = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = String(days).padStart(2, '0');
    hoursEl.innerText = String(hours).padStart(2, '0');
    minutesEl.innerText = String(minutes).padStart(2, '0');
    secondsEl.innerText = String(seconds).padStart(2, '0');
}

function startCountdown(date, name) {
    if (countdownInterval) clearInterval(countdownInterval);
    
    const targetDate = new Date(date).getTime();
    if (isNaN(targetDate)) return;

    titleEl.innerText = name || 'Countdown to Event';
    
    updateCountdown(targetDate);
    countdownInterval = setInterval(() => updateCountdown(targetDate), 1000);
}

function saveToLocalStorage(date, name) {
    localStorage.setItem('countdownDate', date);
    localStorage.setItem('countdownName', name);
}

function loadFromLocalStorage() {
    const savedDate = localStorage.getItem('countdownDate');
    const savedName = localStorage.getItem('countdownName');

    if (savedDate) {
        targetDateInput.value = savedDate;
        eventNameInput.value = savedName || '';
        startCountdown(savedDate, savedName);
    }
}

setBtn.addEventListener('click', () => {
    const date = targetDateInput.value;
    const name = eventNameInput.value;

    if (!date) {
        alert('Please select a valid date and time.');
        return;
    }

    saveToLocalStorage(date, name);
    startCountdown(date, name);
});

loadFromLocalStorage();
