// ==UserScript==
// @name           del.icio.us: External Post Links
// @namespace      http://gecko.535design.com/grease/
// @description    Cause all posts (bookmarks) on del.icio.us to open in a new tab/window.
// @include        http://del.icio.us/*
// ==/UserScript==

window.addEventListener("load", function() {
	var links = document.evaluate('//ol[@class="posts"]/li[@class="post"]/h4[@class="desc"]/a[@rel="nofollow"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < links.snapshotLength; i++) {
		links.snapshotItem(i).setAttribute("target", "_blank");
	}
}, false);
