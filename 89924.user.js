// ==UserScript==
// @name          Flickr Clean 7days
// @namespace     http://patraulea.com/gm/
// @description   Removes header and footer from flickr 7days pages
// @include       http://*flickr.com/*
// ==/UserScript==

// Author: Bogdan Harjoc <patraule@gmail.com>


var ids = ["TopBar", "Tertiary", "FooterWrapper", "int-rand-txt"];

for (var i=0; i<ids.length; i++) {
	var e = document.getElementById(ids[i]);
	e.style["display"] = "none";
}
