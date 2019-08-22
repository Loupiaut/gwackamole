function startGame() {
  preload();
  playerHealth = 3;
  healthCheck(playerHealth);
  collapseAll();
  gameStatus.classList.add('game-rules')
  gameStatus.innerHTML = instructions;
  
  const difficulty = document.querySelector('select').value;

  if (difficulty === "easy")easyMode();
  else if (difficulty === "normal") normalMode(); 
  else if (difficulty === "hard") hardMode();
  else if (difficulty === "too_hard") tooHardMode();
  
  timer(3, startTimer); // start 3secs countdown
  setTimeout(() => {startTimer.innerHTML ="Start"}, 3000)  ;
  setTimeout(() => {startTimer.innerHTML = ""}, 3500)

  setTimeout(() => {
    chronometer = timer(gameLength, gameTimerDisplay);
    timeUp = false;
    setTimeout(() => molePop(), speed);
    
    // Set gameLength
  setTimeout(() => {  
    timeUp = true;
    victory(playerHealth);
  }, gameLength*1000);

  }, 3000)




}

reloadButton.onclick = reload; 
btnStart.onclick = startGame;