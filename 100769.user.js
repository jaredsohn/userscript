// ==UserScript==
// @name           Happy Pets Hack -- Free Money Hack
// @namespace      Happy Pets Hack -- Free Money Hack
// @version        2.5
// @description    Removes the RuneScape Navigation Bar, Video Advert and Top Advertisement Box in F2P Worlds.
// @include        *http://world*.runescape.com/*
// ==/UserScript==

	var nav = document.getElementById("menubox");
	if (nav) {
	    nav.parentNode.removeChild(nav);
	}
	nav = document.getElementById("tb");
	if (nav) {
	    nav.parentNode.removeChild(nav);
	}

// COPYRIGHT 2010 SCORCHY FOR THE PUBLIC DOMAIN