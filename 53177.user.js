// ==UserScript==
// @name Mikromann Profile Crawler
// @namespace by Mentrix
// @description Crawler
// @include http://*.mikromann.*
// ==/UserScript==
pimp = document.getElementById("bottom_about");
pimp.innerHTML = "";
// for (i=0; i < document.links.length; i++)
for (i=0; i < document.links.length; i+=2)
{
var link = document.links[i].href;
var value = link.search (/side=profil/);

if (value == 36) {

pimp.innerHTML += link + "<br>";
xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", link, false);
xmlHttp.send(null);
}
}