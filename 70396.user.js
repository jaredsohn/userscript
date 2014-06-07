// ==UserScript==
// @name           Maximum IL Download sites
// @namespace      Maximum ILDS
// @description    remove re-direct/ads from iDown.me / DowNow.me / Horadot.net
// @include        http*://*idown.me/download*
// @include 	   http*://*downow.me/*
// @include 	   http*://*horadot.net/view*
// @include        http://www.favez0ne.net/search.php
// @author         Kendler
// @moderator	12/10/12 Kendler - Change favezone to favez0ne.net
// links striping on are from http://userscripts.org/scripts/show/64990
// ==/UserScript==

//Show the links (iDown.me)
if (document.domain=="www.idown.me") 
{ 
	document.getElementById('showme').style.display = '';
}

for (var i = 0; i < document.links.length; i++) {
  linkx = document.links[i];
  switch(0) {
    // favezone.net
    case linkx.href.indexOf("http://adf.ly/") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.lastIndexOf("http://")));break;
	// downow.me
	case linkx.href.indexOf("http://downow.me/get.php") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.lastIndexOf("http://")));break;
	// Old iDown
	case linkx.href.indexOf("http://www.idown.me/redirect.php") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.lastIndexOf("http://")));break;
	// New iDown
	case linkx.href.indexOf("javascript:openlink") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.lastIndexOf("http://"),linkx.href.length-3));break;
	// horadot.net
	case linkx.href.indexOf("http://horadot.net/to.php") : linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.lastIndexOf("http://")));break;
  }
}