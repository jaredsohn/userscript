// ==UserScript==
// @name           RemoveUnregisteredPosts
// @namespace      http://www.avclub.com
// @description    Hides unregistered posts from comments
// @include        http://*.avclub.com/*

// Currently, the comments are inside list items, so getting the parent


//GM_log("RemoveUnregisteredPosts");
var nodeZ = document.evaluate("//li/*[@class='comment']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = nodeZ.snapshotLength - 1; i >= 0; i--) {
		var unregComment = nodeZ.snapshotItem(i);
		// GM_log("Found: " +unregComment);
		hideElement(unregComment);
}



	function hideElement(elemX) {
		try {
			elemX.style.display="none";
		} catch (e) {
			GM_log("oopsie " + e );
		}
	}
// ==/UserScript==