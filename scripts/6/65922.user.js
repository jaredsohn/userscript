// ==UserScript==
// @name           Ipernity Diashow
// @version        0.1 (08-Jan-2010)
// @author	       Hannes Trapp - www.hannestrapp.de
// @namespace      http://www.hannestrapp.de
// @description    Changes the damaged Slideshow link on the tag search page to the embedded flash player
// @include        http://www.ipernity.com/tag/*/keyword/*
// ==/UserScript==


var allLinks, thisLink; 
allLinks = document.getElementsByTagName('a'); 
for (var i = 0; i < allLinks.length; i++) { 
    thisLink = allLinks[i]; 
	if (thisLink.href.match(/slideshow/)) {
    	thisLink.href = window.location.href + '/show';
	}
}
