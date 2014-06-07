// ==UserScript==
// @name           YoutubeFF (fast 'n' free)
// @description   Rewrites all Youtube Links to the myud.net Network and unblocks tight Proxy configurations
// @version        0.1
// @author         Helge 'DownLord' Laurisch
// @include        *
// ==/UserScript==

var linka = document.getElementsByTagName('a');
var links = document.getElementsByTagName('param');
var linkz = document.getElementsByTagName('embed');

for(var c=0; c < linka.length; c++)
	{
	linka[c].href = linka[c].href.replace(/www.youtube.com\//,"www.youtube.com.nyud.net/"); 
	}
for(var c=0; c < links.length; c++) 
	{
	links[c].value = links[c].value.replace(/www.youtube.com\//,"www.youtube.com.nyud.net/");	
	}
for(var c=0; c < linkz.length; c++)
	{
	linkz[c].src = linkz[c].src.replace(/www.youtube.com\//,"www.youtube.com.nyud.net/"); 
	}