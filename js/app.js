                          // Temps entre moles aléatoire (not used)
// function randTime(min, max) {
//   return Math.floor(Math.random()*(max-min) + min);
// };

                          // Random hole

function randHole(holes) {
  const i = Math.floor(Math.random()*holes.length);
  // can't select same hole twice in a row and can't create a mole inside when there's already one.
  if (lastHole === i || holes[i].parentNode.classList.contains('up')) return randHole(holes);
  lastHole = i; 
  return holes[i];
};

                          // Loose hp after a while if key not pressed
function hpLossCountdown(id) {
  let countdown = setTimeout(() => healthDown(), stay + (msAnimTime/2));
  window.addEventListener("keydown", (e) => {
    if(e.key === id) clearTimeout(countdown)});
}


                            // SFX

function preload() {
  applause = new Audio("./sounds/applause.wav");
  laugh = new Audio("./sounds/witch_cackle-1.ogg");
}

function applauseF() { 
  applause.play();
}

function laughF() { 
  laugh.play();
}

function molePop() {
  // const time = randTime(1000,2000);
  let hole = randHole(holes);  
  let child = hole.firstElementChild;
  hole.classList.add('up');
  setTimeout(() => hole.classList.remove('up'), stay); // use time for randTime or increase with level?

  hpLossCountdown(child.id);

  if (!timeUp) {setTimeout(() => {
      if(!timeUp) molePop();
    }, speed);
  }
}

function victory(hp) {
    if (playerHealth <=0) return;
    else if (hp === 3) gameStatus.innerText = "Perfect Victory !!!";
    else gameStatus.innerText = 'Victory !!!';
    gameStatus.classList.remove('game-rules');
    applauseF();
    collapseAll();
}

// whack the mole if correct key pressed, otherwise loose hp
function hammerIn(mole){
  mole.parentNode.classList.add('bim');
  setTimeout(() => {
    mole.parentNode.classList.remove('bim');
  }, 175);
} 


function ouch(key) {
  if (!timeUp) {
    let dudule = document.getElementById(`${key}`);
      if (dudule.parentNode.classList.contains("up")) {
        dudule.parentNode.classList.remove("up");
        hammerIn(dudule);
        let soundNay = new Audio("./sounds/hit20.mp3.flac");
        soundNay.play();
      }
      else {
        hammerIn(dudule);
        let soundYay = new Audio("./sounds/impactsplat03.mp3.flac");
        soundYay.play();
        healthDown();
      }
  }
}

function practice(key) {
  if (timeUp) {
    let dudulette = document.getElementById(`${key}`);
    hammerIn(dudulette);
    let soundNay = new Audio("./sounds/hit20.mp3.flac");
    soundNay.play();    
  }
}

function healthDown() {
  playerHealth -= 1;
  healthCheck(playerHealth);
}

function healthCheck(playerHealth) {
  let heartDisplay = "";
  if (playerHealth>0) {
    for (let i=0; i< playerHealth; i++) heartDisplay += `<i class="fas fa-heart"></i>`;
    for (let j=3; j > playerHealth; j--) heartDisplay += `<i class="far fa-heart"></i>`;
    hp.innerHTML = heartDisplay;
  }
  else if (playerHealth <= 0) {
    hp.innerHTML = `<i class="far fa-heart"></i><i class="far fa-heart"></i><i class="far fa-heart"></i>`;
    
    timeUp = true;

    gameStatus.innerHTML = 'Game Over';
    gameStatus.classList.remove('game-rules')
    laughF();
    collapseAll();    
  }
}

function collapseAll() {
  for (let i of holes) {
    i.classList.remove('up')
  }
}


function reload() {
  window.location.reload();
}

