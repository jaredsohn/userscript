// ==UserScript==
// @name          sztar.com onclick remover
// @namespace     http://userscripts.org/users/20715
// @description   Removes the annoying onclick event handler from divs
// @include       http://sztar.com/*
// @include       http://www.sztar.com/*
// ==/UserScript==

var xpath = function( query ) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

for(var items = xpath.call(this, '//td[@onclick]'), i = 0; i < items.snapshotLength; i++) {
	var item = items.snapshotItem(i);
	item.removeAttribute('onclick');
}
