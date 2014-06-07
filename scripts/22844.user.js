// ==UserScript==
// @name           Songerize Download
// @namespace      http://equallyskilled.blogspot.com/
// @include        http://www.songerize.com/
// @description    Downloads songs directly from Songerize
// ==/UserScript==

function downloadIt()
{
	d = unsafeWindow.frames["playframe"].document.getElementsByTagName("object")[0].data;
	s = d.indexOf("&song_url=")+10;
	u = d.substring(s, d.indexOf("&", s+1));
	document.location = u;
}

GM_registerMenuCommand("Download", downloadIt);