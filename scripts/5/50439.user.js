// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          KawaiCrow
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Et le corbeau devint kawai *o*
// @include       http://www.fhordes.fr/*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==



var divs = document.getElementsByTagName("div");
var navatar = new Array();
var j = 0;
for(i = 0, max = divs.length; i < max; i++) {
	if(divs[i].getAttribute('class') == 'infos') {
		navatar[j] = divs[i];
		j++;
	}
}
if(navatar.length != 0) {
	for(i = 0, max = navatar.length; i < max; i++) {
		// Remplace l'avatar du corbeau par l'avatar kawai
		if(navatar[i].childNodes[1].getAttribute('class') == 'avatar theCrow') {
			navatar[i].childNodes[1].childNodes[0].src = 'http://imgup.motion-twin.com/hordes/6/1/02de600c_309096.jpg';
		}

	}
}