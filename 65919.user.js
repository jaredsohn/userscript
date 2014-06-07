// ==UserScript==
// @name           Highlight your username on SOFU
// @namespace      CrazyJugglerDrummer
// @description    highlights wherever your username appears on the page
// @include        http://stackoverflow.com/*
// @include        http://superuser.com/*
// @include        http://serverfault.com/*
// @include        http://meta.stackoverflow.com/*
// ==/UserScript==

var userLink = document.getElementById("hlinks-user").getElementsByTagName("a")[1].href;

var links = document.getElementsByTagName("a");

for (var x=0; x<links.length; x++) {
    if ( links[x].href == userLink ) {
	    links[x].style.color = "#f00"; 
		links[x].style.backgroundColor="#fcc";
	}
}