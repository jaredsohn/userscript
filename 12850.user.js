// ==UserScript==
// @name          DZone Auto-Click Article
// @namespace     http://www.dzone.com/
// @description	  Automatically clicks DZone article links
// @include       http://www.dzone.com/*
// @include       http://www.dzone.com/rsslinks/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

(function() {

var divs = document.getElementsByTagName("div");

for(var i=0;i<divs.length;i++){

	if(divs[i].className == "ldTitle")
	{
		document.location=divs[i].firstChild.getAttribute("href");
	}
}
})();

