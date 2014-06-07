// ==UserScript==
// @name           Resize w3schools content width
// @namespace      http://www.w3schools.com/
// @description    Resize w3schools content width to match your screen resolution
// @include        http://w3schools.com/*
// @include        http://*.w3schools.com/*
// ==/UserScript==
var allElements, thisElement;
allElements = document.evaluate(
    "//table[@width='790']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);
	if(thisElement.width=='790'){
	thisElement.style.width='99.9%';
	}
}
