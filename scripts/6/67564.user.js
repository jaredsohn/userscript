// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GreaseMonkey Google Clock
// @namespace     http://irisquest.net/greasemonkey/GreaseClock
// @description   Displays a clock on the Google home page
// @include       http://www.google.com/
// ==/UserScript==
 
/**
 *   Transforms the argument to a two digit number by adding a leading
 *   "0" if required.
 */
function twoDigitNumber(number) {
	if (number >= 0 && number < 10) {
		return "0" + number;
	}
 
	return number;
}
 
/**
 *   Displays the time in the given parent element.
 */
function displayTime(parent) {
	var currentTime = new Date();	
 
	// Formats the time
	var timeString = twoDigitNumber(currentTime.getHours()) 
		+ ":" + twoDigitNumber(currentTime.getMinutes()) 
		+ ":" + twoDigitNumber(currentTime.getSeconds());
 
	parent.innerHTML = timeString;
}
 
/*
 * Registers the new "time" element.
 */
var new_obj = document.createElement("div");
new_obj.style.textAlign = "center";
var f = function() { displayTime(new_obj) };
 
document.getElementById("body").appendChild(new_obj);
 
window.setInterval(f, 1000);