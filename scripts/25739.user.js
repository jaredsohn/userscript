// ==UserScript==
// @name           Playr-Popup-Onslaught-640x480
// @namespace      onslaught
// @description    Fixes Window Sizes for Vid-Cap
// @include        http://onslaught.playr.co.uk/popup.html
// ==/UserScript==

var allObjects, thisObject;

allObjects = document.evaluate("//*[@height='535']", 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allObjects.snapshotLength; i++) {
	thisObject = allObjects.snapshotItem(i);
	thisObject.height = "482";
}

allObjects = document.evaluate("//*[@width='1000']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allObjects.snapshotLength; i++) {
	thisObject = allObjects.snapshotItem(i);
	thisObject.width = "950";
}

allObjects = document.evaluate("//*[@width='720']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allObjects.snapshotLength; i++) {
	thisObject = allObjects.snapshotItem(i);
	thisObject.width = "648";
}