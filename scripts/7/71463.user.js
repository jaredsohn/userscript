// ==UserScript==
// @name           Facebook - Click Challenge 3 - Cheater
// @namespace      Facebook
// @description    Cheat for the app Click Challenge 3 on Facebook
// @include        http://www.big-bang.gr/click_challenge_3/*
// @author         Bernd Bestel
// ==/UserScript==

// To use this script, don't open the app direct on Facebook!
// Open the absolute path of the application (watch for it in the source code of the app canvas page on Facebook.)

// Here you can enter the number of clicks you would like to perform ;)
var iAnzahlDerKlicks = 17843

try {
	for (i = 0; i < iAnzahlDerKlicks; i++) {
		document.getElementById("eon").click();
	}
}
catch(e) {
	alert(e.message);
}