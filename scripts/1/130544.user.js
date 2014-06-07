// ==UserScript==
// @name           Hide That Thread
// @namespace      http://example.com/hide_that_thread
// @description    Hide a particular thread from Ask Metafilter's list.
// @include        http://ask.metafilter.com/*
// ==/UserScript==

var thatPostSnap = document.evaluate(
	"//div[contains(concat(' ', @class, ' '), ' post ')]/" +
	"span[contains(concat(' ', @class, ' '), ' smallcopy ')]/" +
	"a[starts-with(@href, '/212479')]",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < thatPostSnap.snapshotLength; i++) {
	var thatPost = thatPostSnap.snapshotItem(i);
	if (thatPost == null) {
		continue;
	}
	thatPost = thatPost.parentNode;
	if (thatPost == null) {
		continue;
	}
	thatPost = thatPost.parentNode;
	if (thatPost == null) {
		continue;
	}
	thatPostsParent = thatPost.parentNode;
	if (thatPostsParent == null) {
		continue;
	}
	thatPostsParent.removeChild(thatPost);
}

