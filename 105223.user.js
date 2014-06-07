// ==UserScript==
// @name           RuneScape Fullscreen (With Menu-Box)
// @namespace      © Bawgan © 
// @version        1 
// @description    Removes only the ad, and doesn't remove the Menu Box, for those people who want to use it :)
// @include        *http://world*.runescape.com/*
// ==/UserScript==

	var nav = document.getElementById("menubox");
//IF YOU WANT TO REMOVE THE MENU-BOX TOO, REMOVE THE "//" OFF THE 3 LINES BELOW THIS!
//	if (nav) {
//	    nav.parentNode.removeChild(nav);
//	}
	nav = document.getElementById("tb");
	if (nav) {
	    nav.parentNode.removeChild(nav);
	}

