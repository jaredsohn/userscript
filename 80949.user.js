// ==UserScript==
// @name  Game Graveyard
// @namespace  http://taguri.org/
// @description  refreshes at Game Graveyard
// @include  http://www.neopets.com/halloween/gamegraveyard.phtml*
// ==/UserScript==

function random(min, max) {
	return Math.floor((max - min) * Math.random()) + min;
}

var min = 3000; // in milliseconds
var max = 3000; // 1 second = 1000 milliseconds
var alerts = true; // set this to false if you don't want an alert when you get the avatar
if (document.body.innerHTML.indexOf("you") > 4) {
	window.setTimeout("window.location.reload()", random(min, max));
} else {
	alert("you got the doomed avatar!");
}