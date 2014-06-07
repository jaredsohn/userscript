// ==UserScript==
// @name           MediaFire Auto-Click links
// @include        http://*
// @description    On any page desired this script will automatically open the MF links in new window or tab
// @version		   0.1
// ==/UserScript==

// Release Notes
// 0.1
// -initial code
// End Release Notes

// This script would not be possible without charmy and yansky
window.addEventListener("load",function() {
	var ss = document.evaluate('//a[contains(@href,"http://www.mediafire.com/")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < ss.snapshotLength; i++) {
		var node = ss.snapshotItem(i);
		window.open(node.getAttribute('href'));
	}
}, false);
