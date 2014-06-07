// ==UserScript==
// @name           Mouse.co.il (Achbar Ha'ir) Talkback remover
// @namespace      liorzur
// @description    Removes all talkbacks from www.mouse.co.il (Achbar Ha'ir, i.e. Urban Mouse)
// @include        http://www.mouse.co.il/*
// ==/UserScript==

function removeElements (xPath) {
	var thisElement, allElements = document.evaluate(xPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (f = 0; f < allElements.snapshotLength; f++) {
    thisElement = allElements.snapshotItem(f); thisElement.parentNode.removeChild(thisElement);
	}
}

removeElements("//tr[@id='TR_Response']/following-sibling::*[position()<2]");
removeElements("//div[@class='comment-list']");