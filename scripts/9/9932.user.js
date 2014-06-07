// ==UserScript==
// @name          Direct Linker
// @namespace     
// @description   Based on False Link Remover. Doing same things, but simpler and compatible with Google links.
// @include       http://*
// @include       https://*
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (var i = 0; i < links.length; i++) 
{
	var pos = links[i].href.indexOf("http://", 10);
	if (pos == -1)
	{	var pos = links[i].href.indexOf("http%3A%2F%2F", 10); }
	if (pos != -1) 
	{ 
		links[i].href = decodeURIComponent(links[i].href.substring(pos, 500));
		links[i].title = 'DL: '+links[i].href;
	}
}