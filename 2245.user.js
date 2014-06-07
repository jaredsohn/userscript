// Walla Talkbacks Remover
//
// Version 0.3
// Originally by: 2008, Lior Zur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           Walla Talkbacks Remover
// @namespace      tag:walla.co.il,2005-10-29:wallatalkback.
// @description    Removes all talkbacks from Walla (walla.co.il) site.
// @include        http://*.walla.co.il/*
// ==/UserScript==

////////////////////////////////////////////////
// Remove the talkback divs
////////////////////////////////////////////////

function removeElements (xPath) {
	var thisElement, allElements = document.evaluate(xPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (f = 0; f < allElements.snapshotLength; f++) {
    thisElement = allElements.snapshotItem(f);
    thisElement.parentNode.removeChild(thisElement);
	}
	if (allElements.snapshotLength > 0) return true; 
	else return false;
}

/*
var hebTguvut = String.fromCharCode(1514,1490,1493,1489,1493,1514);
removeElements("//div[text()='"+hebTguvut+"']|"+
					"//div[text()='"+hebTguvut+"']/preceding-sibling::div[position()<2]|"+
					"//div[text()='"+hebTguvut+"']/following-sibling::div[position()<4]");
*/

removeElements("//a[contains(@href,'tb=/i/')]/ancestor::table[1]/ancestor::div[2]");
removeElements("//a[contains(@href,'&tb=/c')]/ancestor::table[1]/ancestor::div[1]");
