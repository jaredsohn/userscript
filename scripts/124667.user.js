// ==UserScript==
// @name           Convert pianoforum.net links to pianostreet.com
// @description    Fixes old links to point to the new domain
// @include        http://*.pianostreet.com/*
// ==/UserScript==

var links = document.getElementsByTagName("a");
var regex = /^(http:\/\/)(www\.)?(pianoforum\.net)(.*)?$/i;

for (var i=0, imax=links.length; i<imax; i++)
{
	var newURL = links[i].href.replace(regex,"$1www\.pianostreet\.com$4");
	
	if (links[i].innerHTML == links[i].href)
		links[i].innerHTML = newURL;
	
	links[i].href = newURL;
}