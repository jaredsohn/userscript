// ==UserScript==

// @name Kirsche

// @namespace https://github.com/Crunch09

// @description Die Foto-Gallerie auf http://www.fotos-kirsche.de kann jetzt per Pfeiltasten navigiert werden.

// @include http://www.fotos-kirsche.de/gallery/pic.php?*

// ==/UserScript==

var zurueck = document.getElementsByTagName('a')[13];
var weiter = document.getElementsByTagName('a')[14];

var link = zurueck.href;

document.onkeydown = function(event) {
	if (event.keyCode == 37){
		window.location(link);
	}
}