// ==UserScript==
// @name        3D Gamers - direct image links
// @namespace   http://www.cs.uni-magdeburg.de/~vlaube/Projekte/GreaseMonkey/
// @description Replaces the links to image pages with direct links to the image.
// @include     http://www.3dgamers.com/*
// ==/UserScript==

var link;
var thumburl;

for (var i=0; i<document.links.length; i++)
{
	// save current link
	link = document.links[i];
	
	// skip all links that do not link to a screenshot
	if(!link.href.match(/^http:\/\/www\.3dgamers\.com\/.*screenshots\/games\/.*\/$/i))
		continue;

	// save the thumbnails url
	thumburl = link.firstChild.src;

	if(!thumburl)
		continue;

	// modify it that it links to the real image
	link.href = thumburl.replace(/^(.*)thumb_(.*)$/i, "$1$2");
}
