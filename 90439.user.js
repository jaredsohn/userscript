// ==UserScript==
// @name           Wikipedia Donate Banner Hider
// @namespace      http://en.wikipedia.org
// @include        http://en.wikipedia.org/wiki/*
// This was written by Dustin Masters.  Contact me at ceo@dustinsoftware.com.
// ==/UserScript==

function hideNotice() {
	document.getElementById('siteNotice').innerHTML = "";

}

setTimeout (hideNotice, 250);

