// ==UserScript==
// @name           KDice right hand menu toggle
// @namespace      KDice right hand menu toggle
// @description    toggles the display of the right hand menu
// @include        http://kdice.com/*
// ==/UserScript==
function main() {
var divMenuOut = document.getElementById("menu-out");
var button = document.createElement("button");
	button.src = "http://bluebutton.info/images/home-button.gif";
	button.style.cursor = "pointer";
	button.style.width = '100';
	button.style.height = '100';
	button.addEventListener("click", toggle_visibility, false);
divMenuOut.appendChild(button);
};

function toggle_visibility() {
   var e = document.getElementById("menu");
   if(e.style.display == 'block')
      e.style.display = 'none';
   else
      e.style.display = 'block';
};

main();