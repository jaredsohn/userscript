// ==UserScript==
// @name           PC-Welt Downloads
// @include        http://www.pcwelt.de/downloads/*
// ==/UserScript==

(function() {
	var allA;
	allA = document.evaluate(
		"//div[@class='download_img']/a",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allA.snapshotLength; i++) {
		allA.snapshotItem(i).href = allA.snapshotItem(i).href.replace(/downloaddauer/, "downloadhinweis");
	}
}
)();