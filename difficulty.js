

function easyMode() {
  speed = 1500;
  stay = 2100;
  for(i = 0; i < moles.length; i++) {
    moles[i].style.transitionDuration = '800ms';
  }
  for(i = 0; i < moles.length; i++) {
    moles[i].style.background = "url('./images/flower-rabbit.gif') bottom no-repeat";
  }
  for(i = 0; i < moles.length; i++) {
    moles[i].style.backgroundSize ="90%";
  }
}

function normalMode() {
  speed = 1000;
  stay = 1400;
  for(i = 0; i < moles.length; i++) {
    moles[i].style.transitionDuration = '400ms';
  }
  for(i = 0; i < moles.length; i++) {
    moles[i].style.background = "url('./images/smile-mole.gif') bottom no-repeat";
  }
  for(i = 0; i < moles.length; i++) {
    moles[i].style.backgroundSize ="90%";
  }
}

function hardMode() {
  speed = 500;
  stay = 700;
  for(i = 0; i < moles.length; i++) {
    moles[i].style.transitionDuration = '200ms';
  }
  for(i = 0; i < moles.length; i++) {
    moles[i].style.background = "url('./images/giphy-downsized.gif') bottom no-repeat";
  }
}