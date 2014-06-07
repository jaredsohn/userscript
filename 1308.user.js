// Author: Blair Hayles
// Name: Mouse Over This!
// Version: 1.1
// Date Updated: 2005.08.08 (yyyy.mm.dd)
// Contact: blair d0t gh @  gmail d0t com
// Copyright Blair Hayles, 2005, All rights reserved.
//
// Changelog:
// 1.0 Initial version, seems completely stable 
// 1.0.1 Removed copyright symbol to make gm's convert to unicode happy
// 1.0.2 Changed the test from link.onmouseover (which Fx or GM now doesn't like) 
//		to the nastier (but working) link.attributes.getNamedItem("onmouseover")
// 1.1 Added code to stop the script if the shift key is held when a page is loaded
//
// ==UserScript==
// @name	MouseOverThis!
// @description	Removes the onmouseover and onmouseout events which are often used to hide links in the status bar.
// @namespace	http://www.geocities.com/blair_g_h/
// ==/UserScript==

var shiftpressed = false;

window.addEventListener('keydown', catchEvent, true);

function catchEvent(e) {
	if (e.shiftKey) {
		shiftpressed = true;
		window.removeEventListener('keydown', catchEvent, true);
		return;
	}
}

setTimeout(removeCode,100); //have to pause slightly to check for key presses
	
function removeCode() {
	if(!shiftpressed){
		window.removeEventListener('keydown', catchEvent, true);
		for (var i=0; i<document.links.length; i++) {
			var link = document.links[i];

			if(link.attributes.getNamedItem("onmouseout") != null){
				link.attributes.removeNamedItem("onmouseout");
			}

			if(link.attributes.getNamedItem("onmouseover") != null){
				link.attributes.removeNamedItem("onmouseover");
			}
		}
	}
}
