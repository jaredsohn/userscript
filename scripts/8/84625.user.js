// ==UserScript==
// @name           Remove re-redirect on Israel Download Sites
// @namespace      CRIMSIL
// @description    remove re-direct from iDown.me / DowNow.me / Horadot.net
// @include        http*://*idown.me/download*
// @include 	   http*://*downow.me/*
// @include 	   http*://*horadot.net/view*
// @author		   CrimsonKing 
// updated at 27/08/10
// thanks to Kendler's script : http://userscripts.org/scripts/show/70396,
// links striping on are from http://userscripts.org/scripts/show/64990
// ==/UserScript==

//Show the links (iDown.me)
if (document.domain=="www.idown.me") 
{ 
	document.getElementById('showme').style.display = '';
}

for (var i = 0; i < document.links.length; i++) {
  linkx = document.links[i];
  if (linkx.href.indexOf("javascript") == 0)
	linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.lastIndexOf("http://"),linkx.href.lastIndexOf("'")));
}