// ==UserScript==
// @name           Variety - Overlay removal
// @namespace      http://www.variety.com
// @description    Attempts to remove the overlay every 0.5 seconds if detected.
// @include        http://www.variety.com/article/*
// ==/UserScript==


// checkInterval is how often you want to ping to check for the registration overlay.  Right now this is set at 0.5 seconds, but if you want it to feel faster, decrease this number.
var checkInterval = 500;   // in miliseconds

var attempts = 0;
var alreadyRemoved = false;
var maxAttempts = 20000 / checkInterval; // Only check for up to 20 seconds, then stop.

// Checks to see if the overlay exists and removes it if it does
function checkOverlay() {
	if (attempts++ > maxAttempts || alreadyRemoved) {
		// be nice
		clearInterval(overlayCheckId);
		return;
	}
	var overlay = document.getElementById('haasOverlay');
	if (overlay && overlay.style.display != 'none') {
		removeOverlay();
	}
}


// Removes the overlay
function removeOverlay() {
	// The black overlay
	var bg = document.getElementById('fadeBackground');
	if (bg) bg.style.display = 'none';
	
	//The registration overlay
	var overlay = document.getElementById('haasOverlay');
	if (overlay) overlay.style.display = 'none';
	
	// No more checking
	alreadyRemoved = true;
	clearInterval(overlayCheckId);
}

// For the first 20 seconds, keep checking if the overlay exists and remove it if it does
var overlayCheckId = setInterval(checkOverlay, checkInterval);