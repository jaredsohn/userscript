// TODO: I just broke this when I was messing around with onclick
// this does not work yet, follow it and I will get it working soon enough

// ==UserScript==
// @name          Google Calendar Fullscreen
// @description   Adds fullscreen capability to Google Calendar
// @include       https://www.google.com/calendar/render*
// @namespace     TimPartridge
// @copyright     GPL 2011
// @version       0.2.20110714
// ==/UserScript==

// set the ID of the element before the fullscreen button
var IdBeforeButton = "todayButton:0"
// Define the elements to be removed by their IDs
var toRemoveById = [
	"vr-proto-header",	// Search bar
	"onegoogbar",		// Topmost Google toolbar
	"nav",				// Left navigation with calendar list
	"mainlogo"			// The word "Calendar" in the top left
	];

// Do not change anything below this line

// Define the fullscreen button
var button = document.createElement('div');
button.innerHTML = "Fullscreen";
button.ID = "fullscreenButton";
button.className = "goog-inline-block goog-imageless-button icon-button"
button.setAttribute("style", "float: left;");
button.onclick = toggleFullscreen;

function toggleFullscreen() {
	alert('hi');
}

// Input: elements - array of strings
// Description: removes the elements with IDs found in elements
function removeElementsById(elements) {
	for (var i = 0; i < elements.length; i++) {
		var e = document.getElementById(elements[i]);
		if (e) removeElement(e);
	}
}
	
// Removes the element from the window
function removeElement(element) {
	element.style.display = "none";
}

// Hook up to the load event
window.addEventListener("load", function(e) {
	// Add the fullscreen button to the page
	var elementAfterButton = (document.getElementById(IdBeforeButton) == null) ? document.body.firstChild : document.getElementById(IdBeforeButton);
	elementAfterButton.parentNode.insertBefore(button, elementAfterButton);

	removeElementsById(toRemoveById)
	
	// Make the calendar flush with the left of the screen
	var calendar = document.getElementById("mainbody");
	if (calendar) calendar.setAttribute("style", "margin-left: 10px");
}, false);