// ==UserScript==
// @name           Full Screen RS F2P! (Open Source Vr. 1.3)
// @namespace      © Scorchy 2008 - Creative Commons Copyrights Apply!
// @description    Removes the RuneScape Navigation Bar and Ad-Box!
// @include        *http://world*.runescape.com/*
// ==/UserScript==

var currentpage = window.location.href;

if(currentpage.indexOf("runescape.com/p") != -1 || currentpage.indexOf("runescape.com/l") != -1){

	var nav = document.getElementById("menubox");
	if (nav) {
	    nav.parentNode.removeChild(nav);
	}
	nav = document.getElementById("tb");
	if (nav) {
	    nav.parentNode.removeChild(nav);
	}
}