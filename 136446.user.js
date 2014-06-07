// ==UserScript==
// @name        TinySubs: FilesHut free
// @namespace   Aspi
// @description Prevents annoying FilesHut popups.
// @include     http://tinysubs.com*
// @grant       none
// @version     0.2
// ==/UserScript==

(function () {
	// Execute using location URI to enter remote environment.
	location.assign('javascript:(' + function () {
		var popupFunction = pu;
		document.removeEventListener('click', popupFunction, false);
	} + '());');
	
	// Disable any action on dropdown list change.
	var dropdownlists = document.getElementsByClassName('search_select');
	for (i = 0, c = dropdownlists.length; i < c; i += 1) {
		dropdownlists[i].onchange = null;
	}
}());