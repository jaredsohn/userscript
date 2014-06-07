// ==UserScript==
// @name           fettnerdcrawl
// @namespace      by
// @description    Simonz1
// @include        http://*.fettnerd.*
// @include        http://www.fettnerd.org/new/index.php?p=vis_online
// @include        http://www.fettnerd.org/new/index.php?p=vis_online&offset=20
// @include        http://www.fettnerd.org/new/index.php?p=vis_online&offset=40
// @include        http://www.fettnerd.org/new/index.php?p=vis_online&offset=60
// @include        http://www.fettnerd.org/new/index.php?p=vis_online&offset=80
// @include        http://www.fettnerd.org/new/index.php?p=vis_online&offset=100
// @include        http://www.fettnerd.org/new/index.php?p=vis_online&offset=120
// @include        http://www.fettnerd.org/new/index.php?p=poeng
// ==/UserScript==
pimp = document.getElementById("body");
pimp.innerHTML = "";
// for (i=0; i < document.links.length; i++)
for (i=0; i < document.links.length; i+=2)
{
var link = document.links[i].href;
var value = link.search	(/new/index.php?p=view_profile&id=);

	if (value == 36) {

	pimp.innerHTML += link + "<br>";
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", link, false);
	xmlHttp.send(null);
    }

}