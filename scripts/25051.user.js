// ==UserScript==
// @name           Runescape Ad & NavBar remover
// @namespace      http://www.trancenotes.com/
// @description    Removes the Runscape Navigation Bar and Advertisements from the main game.
// @include        *world*.runescape.com/*
// ==/UserScript==

//var currentpage = window.location.href;
var removenavbar = true;
var removeAd = true;

	var nav = document.getElementById("menubox");
	if (nav && removenavbar) {
	    nav.parentNode.removeChild(nav);
	}
	nav = document.getElementById("tb");
	if (nav && removeAd) {
	    nav.parentNode.removeChild(nav);
	}