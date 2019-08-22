
// Variables declaration
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const hp = document.getElementById('HP');
const btnStart = document.getElementById('start_btn'); 
const gameTimerDisplay = document.getElementById('timer');
const startTimer = document.getElementById('start-timer');
const gameStatus = document.getElementById('text-display');
const reloadButton = document.getElementById('reload_btn');

const instructions ='Use keyboard to whack the moles :<br /> a / z / e <br /> q / s / d <br /> w / x / c';

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

let lastHole, chronometer, applause, laugh;
let playerHealth = 3;
let timeUp = true;
let gameLength = 15;  // seconds
let speed = 1000;     // ms
let stay = 1200;      // ms

gameTimerDisplay.innerText = `0:${gameLength}`
