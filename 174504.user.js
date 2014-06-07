// ==UserScript==
// @name	Flickr Remove Photos from Contexts
// @namesaspace	http://alesadam.com
// @description	provides one-click access to remove a photo from a group pool on the photo page
// @version	1.0
// @downloadURL	https://userscripts.org/scripts/source/174504.user.js
// @updateURL	https://userscripts.org/scripts/show/174504.meta.js
// @include	http://www.flickr.com/photos/*
// @match	http://www.flickr.com/photos/*
// @run-at	document-end
// ==/UserScript==

(function () {
if (document.location.href.match(/.*flickr.com\/photos\/[^\/]+\/\d+/)) { // only on photo pages
	var inlineRemoves = document.evaluate("//a[contains(@class,'remove-from-context')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i <  inlineRemoves.snapshotLength; ++i) {
		var inlineRemove = inlineRemoves.snapshotItem(i);
		var li = document.evaluate(".//ancestor::li[contains(@class,'sidebar-context-pool')]", inlineRemove, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (!li) {
			GM_log("sidebar context parent not found (set, maybe?); skipping"); // code for sets is no longer in place
			continue;
		}
		inlineRemove.style.display = 'inline';
	}
} // end href test
})();
