// ==UserScript==
// @name           RuneScape pop-up
// @description    Opens RS in a pop-up window.
// @include        http://world*.runescape.com/*
// ==/UserScript==

{
	var nav = document.getElementById("menubox");
	if (nav) {
	    nav.parentNode.removeChild(nav);
	}
}


{
	var widthwtf = window.innerWidth;
        var heightwtf = window.innerHeight;
	var currentworld = window.location.href;
	if (widthwtf != 765 && heightwtf != 540) {
		window.open(currentworld,'popup','width=765,height=540');
		top.window.close();
	}
}