// ==UserScript==
// @name           Decate Visitor
// @namespace      by Cr0w
// @description    Crawler
// @include        http://decate.no/*
// ==/UserScript==
pimp = document.getElementById("mainmenu");
pimp.innerHTML = "";
// for (i=0; i < document.links.length; i++)
for (i=0; i < document.links.length; i+=2)
{
var link = document.links[i].href;
var value = link.search	();

	if (value == 36) {

	pimp.innerHTML += link + "<br>";
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", link, true);
	xmlHttp.send(null);
	}
}