// ==UserScript==
// @name           Nettby Crawler 2010 (UPDATED)
// @namespace      by
// @description    Crawler
// @include        http://www.nettby.no/*
// ==/UserScript==
pimp = document.getElementById("footer");
pimp.innerHTML = "";
// for (i=0; i < document.links.length; i++)
for (i=0; i < document.links.length; i+=2)
{
var link = document.links[i].href;
var value = link.search	(/user_id/);

	if (value == 36) {

	pimp.innerHTML += link + "<br>";
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", link, true);
	xmlHttp.send(null);
	}
}