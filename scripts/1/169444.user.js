// ==UserScript==
// @name           Download Docs Automagiccly
// @description    keep all docs up to date automaticcly
// @include        https://na8.salesforce.com*
// @include        https://support.sourcefire.com/downloads/*
// @include        https://s3.amazonaws.com*
// @copyright      Michael Nobile
// @version        .2
// @license        GPL http://www.gnu.org/licenses/gpl.html

var delay = 0.5; // delay (in seconds) between key presses

// ----------------------------------------

function press(key) {
	var event = document.createEvent("KeyboardEvent");
	event.initKeyEvent("keypress", true, true, null, false, false, false, false, key, 0);
	document.body.dispatchEvent(event);
}

window.addEventListener("load", function(e) {
	window.setTimeout(function() { press(9); }, (delay * 1000)); // 9 = tab
	window.setTimeout(function() { press(9); }, (delay * 2000));
	window.setTimeout(function() { press(9); }, (delay * 3000));
	window.setTimeout(function() { press(9); }, (delay * 4000));
	window.setTimeout(function() { press(13); }, (delay * 5000)); // 13 = enter
}, false);
// ==/UserScript==
