// ==UserScript==
// @name           BasilMarket Tweak - Remove # on links
// @namespace      http://www.w3.org/1999/xhtml
// @description    Removes the # on links so the page doesn't scroll down when it loads
// @include        http://www.basilmarket.com/
// @include        http://www.basilmarket.com/show/forum/*
// ==/UserScript==

var links = document.getElementsByTagName('a');

for(i=0; i<links.length; i++)
	{
		link = links[i].href;
		if (link.split('#')[1] == '')
			links[i].href = link.split('#')[0];
	}