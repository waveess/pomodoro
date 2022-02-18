const timer = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
  };

let interval;
//remaining time
function getRemainingTime(endTime) {
    const currentTime = Date.parse(new Date());
    const difference = endTime - currentTime;

    //the result is converted to an integer with base 10
    const total = Number.parseInt(difference / 1000, 10);
    const minutes = Number.parseInt((total / 60) % 60, 10);
    const seconds = Number.parseInt(total % 60, 10);

    return {
        total,
        minutes,
        seconds,
    };
}

//starting the timer
function startTimer() {
    let { total } = timer.remainingTime;
    //Date.parse() retrieves the timestamp of the current moment
    const endTime = Date.parse(new Date()) + total * 1000;

    interval = setInterval(function() {
        timer.remainingTime = getRemainingTime(endTime);
        updateClock()

        total = timer.remainingTime.total;
        if(total <=0) {
            clearInterval(interval);
        }
    }, 1000);

}

  const modeButtons = document.querySelector('#js-mode-buttons');
  modeButtons.addEventListener('click', handleMode);

//handleMode will handle which break option is selected
function handleMode(event) {
    const { mode } = event.target.dataset;
  
    if (!mode) return;
  
    switchMode(mode);
  }

//to switch between eaech option
function switchMode(mode) {
    timer.mode = mode;
    timer.remainingTime = {
      total: timer[mode] * 60,
      minutes: timer[mode],
      seconds: 0,
    };

    document
    .querySelectorAll('button[data-mode]')
    .forEach(e => e.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
  document.body.style.backgroundColor = `var(--${mode})`;

  updateClock();
}

function updateClock() {
    const { remainingTime } = timer;

    //padStart always displays a set of two digits(like 08 or 12)
    const minutes = `${remainingTime.minutes}`.padStart(2, '0');
    const seconds = `${remainingTime.seconds}`.padStart(2, '0');
  
    const min = document.getElementById('js-minutes');
    const sec = document.getElementById('js-seconds');
    min.textContent = minutes;
    sec.textContent = seconds;
  }