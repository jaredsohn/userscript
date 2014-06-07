// ==UserScript==
// @name          AdslGuide Flat Board
// @description   Displays flat threads and collapsed boards in adslguide by default.
// @include       http://bbs.adslguide.org.uk/*
// ==/UserScript==

function changehref(contains, replace) {
	var links = document.evaluate(
	    "//a[contains(@href, '"+contains+"')]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < links.snapshotLength; i++) {
		a = links.snapshotItem(i);	
		a.href = replace(a.href);
	}
}

// Display flat threads
changehref("showthreaded.php", function(href) {
	return href.replace("showthreaded.php", "showflat.php");
});

// Display collapsed forums
changehref("postlist.php", function(href) {
	return href + "&view=collapsed";
});
