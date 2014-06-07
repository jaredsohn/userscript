// ==UserScript==
// @name        MySpace.com - Clean URLs
// @description Rewrites profile links on MySpace.com pages into using the shortcut number id versions.
// @include     http://myspace.com/*
// @include     http://*.myspace.com/*
// ==/UserScript==

(function() {

	var xpath = "//a[starts-with(@href,'http://profile.myspace.com')]";
	var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var i, link;
	for (i = 0; link = res.snapshotItem(i); i++) {

		link.href =
			link.href.replace(
				/profile\.myspace.+?viewprofile\&friendID=([0-9]+)[^0-9].*$/,
				"myspace.com/$1"
			);
	} 

})();