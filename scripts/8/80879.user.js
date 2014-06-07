// ==UserScript==
// @name          Neopets Almost Abandoned Attic Edited.
// @namespace     Browsing
// @description   Disables the confirmation popups in Almost Abandoned Attic. Also refreshes at it while it's not restocked. Based on the 'Neopets Igloo Helper' script, by Zach Edwards (/Zachafer) & others.
// @include       *neopets.com/halloween/*garage*.phtml
// @include       *neopets.com/halloween/process_garage.phtml*
// ==/UserScript==

function random(min, max) {
	return Math.floor((max - min) * Math.random()) + min;
}

var min = 3000; // in milliseconds
var max = 3000; // 1 second = 1000 milliseconds
var alerts = true; // set this to false if you don't want an alert on restock
if (document.body.innerHTML.indexOf("We just ran out of items") > -1) {
	window.setTimeout("window.location.reload()", random(min, max));
} else {
	alert("Abandoned Attic has restocked!");
}


//adding complete buy, and a user item list.