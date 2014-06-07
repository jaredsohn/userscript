// ==UserScript==
// @name           Direct Recorded Game downloader
// @namespace      http://www.siddharthabbineni.com
// @description    Automatically downloads the Recorded Game on viewing the page, no need to click
// @include        http://www.aoczone.net/*
// @version        0.1
// @date           2008-08-31
// ==/UserScript==

var regExp = /(http:\/\/www\.aoczone\.net\/download\/file\.php\?id=)([0-9]*)/

var allLinks = document.getElementsByTagName("a");
for (var i=0; i<allLinks.length; i++) {
	if (allLinks[i].href.match(regExp)) {
		location.replace(allLinks[i].href);
		break;
	}
}
