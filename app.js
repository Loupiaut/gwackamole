
function buttonclicked(e) {
  console.log(e);
  console.log("clic détecté");
}


var buttons = document.getElementsByClassName("carres-base");
for (let button of buttons) {
  button.onclick = buttonclicked;
};


// for (let i =0; i < buttons.length; i++) {
//   buttons[i].onclick = buttonclicked;
// }