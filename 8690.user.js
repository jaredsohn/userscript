// version 1.0
// Written by Lior Zur, 2007
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           Nana Remove Textual Ads
// @namespace      liorzur
// @description    Removes the "Merlin" textual advertisements from Nana.co.il
// @include        http://*nana.co.il/Article/?ArticleID*
// ==/UserScript==

function removeElements (xPath) {
	var thisElement, allElements = document.evaluate(xPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (f = 0; f < allElements.snapshotLength; f++) {
    thisElement = allElements.snapshotItem(f);
    thisElement.parentNode.removeChild(thisElement);
	}
}

removeElements ("//td[contains(@id,'Merlin')]/ancestor::div[parent::td]");