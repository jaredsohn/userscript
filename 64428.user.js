// ==UserScript==
// @name           MangaHelpers AutoDownload
// @namespace      http://userscripts.org/scripts/show/64428
// @description    auto downloads
// @include        http://mangahelpers.com/s/*/download/*
// @include        http://mangahelpers.com/downloads/download/*
// @copyright      2009+, Toost Inc.
// @license        kopimi http://www.kopimi.com/kopimi/
// @version        1.5
// ==/UserScript==


var	xpath = document.evaluate(
    "/html/body/div/div[2]/div/div/div/div[3]/p[2]/a",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
var Link = xpath.snapshotItem(0);

if (Link!=null) {

	var href = Link.href;
	
	window.location.replace(href);

}

else if (Link==null) {

	var	xpath = document.evaluate(
    "/html/body/div/div[2]/div/div/div/div[3]/a",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
	var externalLink = xpath.snapshotItem(0);
	
	var href = externalLink.href;
	
	window.location.replace(href);

}
	