// ==UserScript==
// @name	MSPLinks
// @namespace	http://www.smert.net/
// @description	MSP links (www.msplinks.com) converter for myspace's external links
// @include	*.myspace.com/*
// ==/UserScript==

var links = document.getElementsByTagName("a");

for (i = 0; i < links.length; i++)
{
	var newlink = links[i].href.replace("http://www.msplinks.com/", "");

	if (links[i].href != newlink) links[i].href = atob(newlink).replace(/^01/, "");
}
