// ==UserScript==
// @name           FatWallet Promo Band Remover
// @namespace      None
// @include        http://www.fatwallet.com/*
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
var elementsToRemove = xpathQuery('//div[@id="promoBand"]');
for (var i = 0; i < elementsToRemove.snapshotLength; i++) {
	var currentElement = elementsToRemove.snapshotItem(i);
	currentElement.parentNode.removeChild(currentElement);
}