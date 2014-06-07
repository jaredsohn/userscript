// ==UserScript==
// @name        i c h c ping test
// @namespace   pingtester
// @description i c h c ping test
// @include     http://www.icanhazchat.com/ping_test_room
// @version     0.0.2
// ==/UserScript==

function step1() {
  alert('step1');
  setTimeout('step2();', 1000 );
}

function step2() {
  alert('step2');
  setTimeout('step3();', 1000 );
}

function step3() {
  alert('step3');
}

function main() {
  setTimeout('step1();', 1000 );
}

var script = document.createElement("script");
script.textContent = "(" + main.toString() + ")();";
document.body.appendChild( script );
