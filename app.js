
// Variables declaration
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const hp = document.getElementById('HP');
const btnStart = document.getElementById('start_btn'); 
const countdownDisplay = document.getElementById('timer');
const gameStatus = document.getElementById('text-display');
const reloadButton = document.getElementById('reload_btn');


let element = document.querySelector('.mole');
let animTime = window.getComputedStyle(element, null).getPropertyValue('transition-duration');
const msAnimTime = Number(animTime.slice(0,-1))*1000;



const getKey = document.addEventListener("keydown", (e) => {
  let allowedKeys = ["a","z","e","q","s","d","w","x","c"]
  if (allowedKeys.includes(e.key) && !timeUp) {
    ouch(e.key);
  }
  else if(allowedKeys.includes(e.key) && timeUp) {
    practice(e.key);
  }
});

let lastHole;
let playerHealth = 3;
let timeUp = true;
let gameLength = 20;  // seconds
let speed = 1000;     // ms
let stay = 1200;      // ms


// Temps entre moles aléatoire (not used)
// function randTime(min, max) {
//   return Math.floor(Math.random()*(max-min) + min);
// };

// Random hole
function randHole(holes) {
  const i = Math.floor(Math.random()*holes.length);
  console.log(i)
  // can't select same hole twice in a row and can't create a mole inside 
  if (lastHole === i || holes[i].parentNode.classList.contains('up')) {
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

function applause() {
  let applause = new Audio("./sounds/applause.wav")
  applause.play();
}

function laugh() {
  let laugh = new Audio("./sounds/witch_cackle-1.ogg")
  laugh.play();
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
      if(!timeUp)
      molePop();
    }, speed);
  }
  else {
    victory(playerHealth);
  }
}

function victory(hp) {
  setTimeout(() => {
      if (hp === 3) {
        gameStatus.innerHTML = "Perfect Victory !!!";
      }
      else {
        gameStatus.innerHTML = 'Victory !!!';
      }
      gameStatus.classList.remove('game-rules');
      applause();
      collapseAll();
    }, speed);
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
    laugh();
    collapseAll();    
  }
}

function collapseAll() {
  for (let i of holes) {
    i.classList.remove('up')
  }
}

function startGame() {
  playerHealth = 3;
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