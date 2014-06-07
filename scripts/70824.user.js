// ==UserScript==
// @name           Disable links
// @namespace      maeki.org
// @description    Disable all links on the page
// @include        http://www.youtube.com/*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.getElementsByTagName('a');
for (var i = 0; i < allLinks.length; i++) {
    thisLink = allLinks[i];
    thisLink.setAttribute("href", "#");
	thisLink.setAttribute("onmousedown", "");
	}