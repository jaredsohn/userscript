// ==UserScript==
// @name Onepress Social Unlocker
// @namespace noname120
// @description View content locked by the Wordpress Social Locker plugin made by Onepress
// @version 0.2
// @license GPL version 3
// @author noname120

// @homepageURL http://userscripts.org/scripts/show/446687
// @updateURL https://userscripts.org/scripts/source/446687.meta.js

// @include http*://*
// @grant none
// @run-at document-end
// ==/UserScript==



// Find all onp buttons
var onpLockers = document.querySelectorAll('.onp-sociallocker');

for (var i=0, currLock; currLock=onpLockers[i]; i++) {
	if (currLock.nodeType != 1) {continue;}
	
	// Hide them
	currLock.setAttribute('style','display:none;');
}

// Find all onp content
var onpContent = document.querySelectorAll('.onp-sociallocker-content');

for (var i=0, currContent; currContent=onpContent[i]; i++) {
	if (currContent.nodeType != 1) {continue;}

	// Display them
	currContent.removeAttribute('style');
}