// ==UserScript==
// @name           Pandora ArrowRater
// @author         Carlton Kenney
// @description    Allows you to rate pandora songs with up/down arrows
// @copyright      2012 by Carlton Kenney
// @version        0.1
// @lastupdated    3/22/2012
// @include        *pandora.com/*
// ==/UserScript==

function KeyCheck(e) {
	if(e.keyCode == 38) {
		document.getElementsByClassName("thumbUpButton")[0].childNodes[0].click();
	}
	if(e.keyCode == 40) {
		document.getElementsByClassName("thumbDownButton")[0].childNodes[0].click();
	}
}

window.addEventListener('keydown', KeyCheck, true);