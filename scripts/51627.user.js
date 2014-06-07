// ==UserScript==
// @name           Runescape in full screen
// @namespace      Nibbler
// @description    this script makes that you can play Runescape in FullScreen.
// @include        *world*.runescape.com/*
// ==/UserScript==


	var nav = document.getElementById("menubox");
	if (nav) {
	    nav.parentNode.removeChild(nav);
	}
	nav = document.getElementById("tb");
	if (nav) {
	    nav.parentNode.removeChild(nav);
	}

{
alert("Runescape is now going Fullscreen - w00t!");
}