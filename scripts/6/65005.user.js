// ==UserScript==
// @name           blog.nl remove inline ads
// @namespace      Made by Jeffrey
// @description    Haalt de irritante reclamelinks in berichten weg
// @include        *.blog.nl/*
// @version        1.1
// ==/UserScript==

var links = document.getElementsByTagName ('a');

for(i=0;i<links.length;i++) {
	var tmplink = links[i].href;
	var tmplink = tmplink.split('/');
	var tmplink = tmplink[2];

	if (tmplink == 'clk.tradedoubler.com' || tmplink == 'clicks.m4n.nl') {
		links[i].parentNode.insertBefore(links[i].childNodes[0].cloneNode(true),links[i]);
		links[i].parentNode.removeChild(links[i]);
	}
}