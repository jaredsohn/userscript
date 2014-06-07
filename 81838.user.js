// ==UserScript==
// @name          AppBrain NoClick
// @namespace     xenocrates
// @description   Removes onclick handlers that interfere with middle clicking, thereby pissing me off"
// @include       http://www.appbrain.com/*
// @include       http://appbrain.com/*
// ==/UserScript==

//Removes onclick from some divs
var xpath = function( query ) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

for(var items = xpath.call(this, "//li[contains(@class,'app-item')] | //div[contains(@class,'result')] "), i = 0; i < items.snapshotLength; i++) {
	var item = items.snapshotItem(i);
	item.removeAttribute('onclick');
}
