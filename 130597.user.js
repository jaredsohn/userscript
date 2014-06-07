// ==UserScript==
// @name			Pardus Message Frame Links
// @version			v2
// @namespace		marnick.leau@skynet.be
// @description		Adds custom links to the Message Frame
// @icon			http://www.majhost.com/gallery/Faziri/Pardus/Scripts/icon.png
// @include			http*://*.pardus.at/msgframe.php
// @grant			none
// ==/UserScript==

var links = ["http://pardus.rukh.de/pshipcalc.htm","http://pardusmap.mhwva.net/Artemis"];
var text = ["Ship Calc","Galactic Map"];
var separator = " | ";

var box = document.links[0].parentNode.nextSibling.nextSibling.nextSibling;
var linkshtml = "<br>";
for (var i = 0;i < links.length;i++) {
	linkshtml += "<a href=\"" + links[i] + "\" target=\"_new\">" + text[i] + "</a>"
	if (i < links.length - 1) {
		linkshtml += separator;
	}
}
box.innerHTML += linkshtml;