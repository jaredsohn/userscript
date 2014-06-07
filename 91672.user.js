// ==UserScript==
// @name           no moar puddi
// @namespace      0
// @include        http://boards.4chan.org/*
// ==/UserScript==

var embeds = document.getElementsByTagName("embed");
for(i=0; i<embeds.length; i++)
	embeds[i].parentNode.removeChild(embeds[i]);