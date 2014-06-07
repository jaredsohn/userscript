// ==UserScript==
// @name	MSPLinks
// @namespace	http://www.smert.net/
// @description	MSP links (www.msplinks.com) converter for myspace's external links
// @include	*.myspace.com/*
// ==/UserScript==

var links = document.getElementsByTagName("a");

for (i = 0; i < links.length; i++)
{
	var newlink = links[i].href.replace(/http\:\/\/www\.msplinks\.com\//, '');

	if (links[i].href != newlink) links[i].href = atob(newlink).replace(/^01/, '');
}

var links = document.getElementsByTagName("textarea");

for (i = 0; i < links.length; i++)
{
	var match = links[i].textContent.match(/http\:\/\/www\.msplinks\.com\/[^\"]*/g);
	if (match) {
		for (j = 0; j < match.length; j++)
		{
			var matches = links[i].textContent.match(/http\:\/\/www\.msplinks\.com\/[^\"]*/g);
			var newlink = matches[0].replace(/http\:\/\/www\.msplinks\.com\//, '');
			if ( matches[0] != newlink ) {
				newlink = atob(newlink).replace(/^01/, '');
				links[i].textContent = links[i].textContent.replace(/http\:\/\/www\.msplinks\.com\/[^\"]*/, newlink);
	                }
		}
	}
}