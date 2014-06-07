// ==UserScript==
// @name		Jutarnji banner skip
// @namespace	jbs
// @description Skips banners on jutarnji.hr
// @version     1.00
// @include     http://www.jutarnji.hr/*
// ==/UserScript==

allLinks = document.evaluate('//a[@href]', document, null, 6, null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	var mLink = thisLink.href.match(/\\?banner=true&foto=(\d+)/);
	if(mLink) {
		var no = parseInt(mLink[1]);
		if(window.location.href.match("foto=" + mLink[1]))
		{
			no++;
		}
		thisLink.href = "?foto=" + no;
	}
}
