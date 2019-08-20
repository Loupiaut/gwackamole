const timerDisplay = document.getElementById('timer');


function timer(seconds) {
  let timerCountdown;
  const now = Date.now();
  const then = now + seconds*1000;
  displayTimeLeft(seconds);

  timerCountdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now())/1000)
    if (secondsLeft <= 0) {
      clearInterval(timerCountdown);
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  // const minutes = Math.floor(seconds/60);
  const remainingSeconds = seconds % 60;
  const display = `0:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  timerDisplay.innerHTML = display;
}