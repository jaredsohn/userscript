// ==UserScript==
// @name           LimitDrudge
// @namespace      http://drudge
// @description    hide stuff, just the info please
// @include        http://www.drudgereport.com/
// ==/UserScript==
var allElements, theImage;
allElements = document.evaluate(
    '//img',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allElements.snapshotLength; i++) {
    theImage = allElements.snapshotItem(i);
	var theImage, altText;
	if (theImage) {
		altText = document.createTextNode(theImage.alt);
		theImage.parentNode.replaceChild(altText, theImage);
	}
	
}


var allElements, theImage;
allElements = document.evaluate(
    "//font[@size='+7']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allElements.snapshotLength; i++) {
    theElement = allElements.snapshotItem(i);
	theElement.style.fontSize = "20px";
	
}
