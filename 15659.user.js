// --------------------------------------------------------------------
// ==UserScript==
// @namespace     BGC.INPUT.REVEAL
// @name          Reveal hidden input and password input
// @description   Show all hidden fields so you can edit the values before submitting. It also replace the * in password fields into real text.
// @include       http://*
// @include       https://*
// ==/UserScript==
GM_registerMenuCommand("Reveal input",On);
GM_registerMenuCommand("Reset input",Off);

function On() { setMe(true) }
function Off() { setMe(false)}

function setMe(sw) {
var inputs = document.getElementsByTagName('input');
for (var i = 0; i < inputs.length; i++) { 
  if (sw == true) {
  // remove type PWD
  if (inputs[i].getAttribute('type') == 'password') {
  	inputs[i].setAttribute('type' , 'text');
  	inputs[i].setAttribute('oldtype' , 'password');
  } 
  
  //show hidden fields
    if (inputs[i].getAttribute('type') == 'hidden') {
    inputs[i].setAttribute('type', 'text'); 
    inputs[i].setAttribute('oldtype', 'hidden'); 
    inputs[i].setAttribute('style', 'background:pink'); 
    inputs[i].disabled=false;
  } 
  
}
else {
	// 
  if (inputs[i].getAttribute('oldtype') == 'password') {
    inputs[i].setAttribute('type', 'password'); 
  } 
 
   //hide hidden fields
    if (inputs[i].getAttribute('oldtype') == 'hidden') {
    inputs[i].setAttribute('type', 'hidden'); 
  } 
}
}
}