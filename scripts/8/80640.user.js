// ==UserScript==
// @name Last.fm - Fix google chart
// @namespace
// @description Enables y-axis on google chart on track pages
// @include http://www.last.fm/music/*/*/*
// ==/UserScript==

function xpath(query, context) {
	if (!context) { context = document; }
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

(function () {
var googleAddr = xpath('//div[@class="scrobblepron"]/div');
if (googleAddr.snapshotLength > 0) {
  googleAddr.snapshotItem(0).innerHTML = googleAddr.snapshotItem(0).innerHTML.replace(/,ffffffff,/,",0,");
} else {return; } }) ();