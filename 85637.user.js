// ==UserScript==
// @name			CleanWDP
// @namespace	http://runedev.info
// @description		Removes ads & frames from specified sites.
// @include		http://*watchdontpay.com/*
// ==/UserScript==

function hideChildElement(parent, element, n) {
	window.document.getElementById(parent).getElementsByTagName(element)[n].style.display = "none";
}

hideChildElement("colm1", "div", 0);								// Ad Box
window.document.getElementById("guideline").style.display = "none";		// Guidelines
window.document.getElementById("message").setAttribute("autocomplete", "off");		// Chatbox Autocomplete Off