// ==UserScript==
// @name           Gmail Tabbing Fix
// @namespace      gdc_
// @include        http*://mail.google.com/*
// ==/UserScript==

var allElements, thisElement;

function fix_tabindex() {
	allElements = document.evaluate(
		'//div[@tabindex="0" and @role="button" and @class="J-Zh-I J-J5-Ji Bq L3"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allElements.snapshotLength; i++) {
		thisElement = allElements.snapshotItem(i);
		thisElement.tabIndex = "1";
	}
}

setInterval(fix_tabindex, 2000);