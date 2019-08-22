function timer(seconds, display) {
  let timerCountdown;
  const now = Date.now();
  const then = now + seconds*1000;
  displayTimeLeft(seconds, display);

  timerCountdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now())/1000)
    if (secondsLeft <= 0) {
      clearInterval(timerCountdown);
    }
    displayTimeLeft(secondsLeft, display);
  }, 1000);
}

function displayTimeLeft(seconds, display) {
  // const minutes = Math.floor(seconds/60);
  const remainingSeconds = seconds % 60;
  const toto = `0:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  const tata = remainingSeconds;
  if (display === startTimer) display.textContent = tata;
  else display.textContent = toto;
}