// ==UserScript==
// @name           Blogvisitor
// @namespace      by Mentrix
// @description    Blog Crawler - Just for fun :)
// @include        http://*.blogg.*
// ==/UserScript==
pimp = document.getElementById("side");
pimp.innerHTML = "";
// for (i=0; i < document.links.length; i++)
for (i=0; i < document.links.length; i+=2)
{
var link = document.links[i].href;
var value = link.search	(/profile/);


	if (value == 36) {

	pimp.innerHTML += link + "<br>";
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", link, false);
	xmlHttp.send(null);
	}
}

