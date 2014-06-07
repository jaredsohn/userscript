
// ==UserScript==
// @name          Reddit NoClick
// @namespace     akjdfkjs
// @description   Removes onclick handlers that interfere with vimperator's "follow-hint"
// @include       http://www.reddit.com/*
// @include       http://reddit.com/*
// ==/UserScript==

//Removes onclick from body
// var bodies, body;
// bodies = document.getElementsByTagName('body');
// for (var i = 0; i < bodies.length; i++) {
    // body = bodies[i];
	// body.removeAttribute('onclick');
// }

//Removes onclick from some divs
var xpath = function( query ) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
for(var items = xpath.call(this, "//div[@id='siteTable']/* | //body | //div[contains(@class,'thing id-')] "), i = 0; i < items.snapshotLength; i++) {
	var item = items.snapshotItem(i);
	item.removeAttribute('onclick');
}
