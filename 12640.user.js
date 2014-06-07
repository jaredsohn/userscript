// ==UserScript==
// @name		Blue's News Ad Remover
// @namespace	Zorilla (with credit to Alexander Redington for original "AdBot Blocker" script)
// @description	Removes ads from Blue's News put in place by UGO
// @include	http://*.bluesnews.com/*
// ==/UserScript==

function xpathQuery(inputElements) {
	
	return document.evaluate(
		inputElements,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
}

// Remove ads
var elementsToRemove, currentElement
elementsToRemove = xpathQuery('//div[@id="immercial"] | //div[@id="ad-728x90"] | //td[@id="todayOnUGO"] | //div[@class="ad-300x250"] | //div[@align="center" and descendant::table/tbody/tr/td/iframe[@width="775" and @height="600"]]');
for (var i = 0; i < elementsToRemove.snapshotLength; i++) {
	currentElement = elementsToRemove.snapshotItem(i);
	currentElement.parentNode.removeChild(currentElement);
}