// ==UserScript==
// @name          Neopets AAA - F5er/No Popups
// @namespace     sCORE @ Darkztar.com
// @description   Disables the confirmation popups in Almost Abandoned Attic. Also refreshes at it while it's not restocked. 
// @include       *neopets.com/halloween/*garage*.phtml
// @include       *neopets.com/halloween/process_garage.phtml*
// ==/UserScript==

function random(min, max) {
	return Math.floor((max-min) * Math.random()) + min;
}

var min = 100;  // fastest
var max = 300; // slowest
var alerts = false; // No-pop

if(document.body.innerHTML.indexOf("We just ran out of items") > -1) {
	window.setTimeout("window.location.reload()", random(min, max));
} else { alert("Abandoned Attic has restocked!"); }