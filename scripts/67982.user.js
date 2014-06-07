// ==UserScript==
// @name           URL compact display
// @namespace      http://codertown.com
// @description    Shortens displayed text of URLs preventing horizontal stretching of forum pages and horizontal scrollbar appearing in FireFox
// @include        */viewtopic.php*
// ==/UserScript==

var MAXLENGTH = 80;

var allElements, thisElement;
allElements = document.evaluate(
    "//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);
	if (thisElement && thisElement.text.length > MAXLENGTH) {
		var shortText = thisElement.text.substring(0, MAXLENGTH/2) + ' ... ' + thisElement.text.substring(thisElement.text.length-MAXLENGTH/2+5, thisElement.text.length);
		thisElement.innerHTML = shortText;
	}
}