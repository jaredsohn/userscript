// ==UserScript==
// @name           TheVault AutoDownload Torrents by 0.o
// @include        http://*
// @description    On any page desired this script will automatically open the TV .torrent links in new window or tab
// @version		   0.1
// ==/UserScript==

// Release Notes
// 0.1
// -initial code
// End Release Notes

// 
window.addEventListener("load",function() {
	var ss = document.evaluate(
   '//a[@class="index"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < ss.snapshotLength; i++) {
		var node = ss.snapshotItem(i);
		window.open(node.getAttribute('href'));
	}
}, false);

