// ==UserScript==
// @name          vBulletin always link to first unread post
// @namespace     http://henrik.nyh.se
// @description   For vBulletin forums such as 99mac.se and SweClockers.com, the link to a forum thread will now point to the first unread post in that thread.
// @include       *
// ==/UserScript==


function xp(query, root) { return document.evaluate(query, root || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
function xps(query, root) { return document.evaluate(query, root || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue; }
function with_each(query, cb, root) {
	var results = xp(query, root);
	for (var i = 0, j = results.snapshotLength; i < j; i++)
		cb(results.snapshotItem(i));
}


var unreadLinks = '//img[contains(@src, "firstnew")]/ancestor::a';
var relativeThreadLink = "following::a[1]";

with_each(unreadLinks, function(item) {
	xps(relativeThreadLink, item).href = item.href;
});