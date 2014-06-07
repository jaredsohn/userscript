// ==UserScript==
// @name           Blank Images
// @namespace      rainyrhy
// @description    Blanks all <img>. Would show an broken image with alt text. Useful for hiding "obscene" images without breaking the page layout.
// @include        *
// ==/UserScript==

function init()
{
	var images = document.getElementsByTagName("img");
	for ( var i = 0 ; i < images.length; ++i ) {
		images[i].src = "";
	}

}

window.addEventListener("load", init, false);
