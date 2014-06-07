// ==UserScript==
// @name           Kongregate-Onslaught-640x480
// @namespace      onslaught
// @description    Fixes Window Sizes for Vid-Cap
// @include        http://*.kongregate.com/games/gaby/onslaught2*
// ==/UserScript==

var allObjects, thisObject;

allObjects = document.evaluate("//*[@height='520']", 
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

allObjects = document.evaluate("//*[@width='700']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allObjects.snapshotLength; i++) {
	thisObject = allObjects.snapshotItem(i);
	thisObject.width = "650";
}