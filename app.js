
// Variables declaration
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const hp = document.getElementById('HP');
const btnStart = document.getElementById('start_btn'); 
const countdownDisplay = document.getElementById('timer');
const gameStatus = document.getElementById('text-display');

let element = document.querySelector('.mole');
let animTime = window.getComputedStyle(element, null).getPropertyValue('transition-duration');
const msAnimTime = Number(animTime.slice(0,-1))*1000;



const getKey = document.addEventListener("keydown", (e) => {
  let allowedKeys = ["a","z","e","q","s","d","w","x","c"]
  if (allowedKeys.includes(e.key)) {
  ouch(e.key);

  }
});

let lastHole;
let playerHealth = 3;
let timeUp = false;
let gameLength = 20;  // in seconds
let speed = 1000;     // in ms
let stay = 1200;      // in ms


// Temps entre moles aléatoire (not used)
function randTime(min, max) {
  return Math.floor(Math.random()*(max-min) + min);
};

// Random hole
function randHole(holes) {
  const i = Math.floor(Math.random()*holes.length);
  console.log(i)
  // can't select same hole twice in a row and can't create a mole inside 
  if (holes[i].parentNode.classList.contains('up')) {
    return randHole(holes);
  }
  lastHole = i; 
  return holes[i];
};

function hpLossCountdown(id) {
  let countdown = setTimeout(() => {
    healthDown();
  }, stay + (msAnimTime/2));
  window.addEventListener("keydown", (e) => {
    if(e.key === id) {
      clearTimeout(countdown);
    }
  });
}

function molePop() {
  // const time = randTime(1000,2000);
  const hole = randHole(holes);  
  hole.classList.add('up');
  let child = hole.firstElementChild; 

  setTimeout(() => {
    hole.classList.remove('up');
  }, stay); // use time for randTime or increase with level?

  hpLossCountdown(child.id);

  if (!timeUp) {
    setTimeout(() => {
      molePop();
    }, speed);
  }
  else if(timeUp && playerHealth === 3) {
    setTimeout(() => {
      gameStatus.innerHTML = 'Perfect Victory !!!';
      gameStatus.classList.remove('game-rules');
    }, speed);
  }
  else if (timeUp && playerHealth > 0) {
    setTimeout(() => {
      gameStatus.innerHTML = 'Victory !!!';
      gameStatus.classList.remove('game-rules');
    }, speed);
  }
}

// whack the mole if correct key pressed, otherwise loose hp
function ouch(key) {
  if (timeUp === false) {
    let dudule = document.getElementById(`${key}`);
      if (dudule.parentNode.classList.contains("up")) {
        dudule.parentNode.classList.remove("up");
      }
      else {
        healthDown();
      }
  }
}

function healthDown() {
  playerHealth -= 1;
  healthCheck();
}

function healthCheck() {
  if (playerHealth === 3) {
    hp.innerHTML = `<i class="fas fa-heart"></i><i class="fas fa-heart"></i><i class="fas fa-heart"></i>`;
  }
  else if (playerHealth === 2) {
    hp.innerHTML = `<i class="fas fa-heart"></i><i class="fas fa-heart"></i><i class="far fa-heart"></i>`;;
  }
  else if (playerHealth === 1) {
    hp.innerHTML = `<i class="fas fa-heart"></i><i class="far fa-heart"></i><i class="far fa-heart"></i>`;
  }
  else if (playerHealth === 0) {
    hp.innerHTML = `<i class="far fa-heart"></i><i class="far fa-heart"></i><i class="far fa-heart"></i>`;
    timeUp = true;
    gameStatus.innerHTML = 'Game Over'
    gameStatus.classList.remove('game-rules')
    timer(0);
    
  }
}

function startGame() {
  playerHealth = 300;
  healthCheck();
  gameStatus.classList.add('game-rules')
  gameStatus.innerHTML = 'Use keyboard to whack the moles :<br /> a / z / e <br /> q / s / d <br /> w / x / c';
  
  const difficulty = document.querySelector('select').value;

  if (difficulty === "easy") {
    easyMode();
  }
  else if (difficulty === "normal") {
    normalMode(); 
  }
  else if (difficulty === "hard") {
    hardMode();
  }

  
  timeUp = false;
  molePop();

// Sets length of a game
  timer(gameLength);
  setTimeout(() => {  
    timeUp = true;
  }, gameLength*1000);

}

btnStart.onclick = startGame;