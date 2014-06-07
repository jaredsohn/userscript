// ==UserScript==
// @name           Ebay - Remove Image Overlay
// @namespace      #aVg
// @description    Removes the overlay preventing the user from saving images.
// @include        http://cgi.ebay.*/*
// @version        0.1.1
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
var divs = document.getElementsByTagName("div"), div;
for(var i = divs.length - 1; i >= 0; --i) {
	div = divs[i];
	if(/bdiv$/.test(div.id)) div.parentNode.removeChild(div);
}