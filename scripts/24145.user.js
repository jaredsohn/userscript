// ==UserScript==
// @name           Kongregate-Onslaught-720x535
// @namespace      onslaught
// @description    Fixes Window Sizes
// @include        http://*.kongregate.com/games/gaby/onslaught2*
// ==/UserScript==

var allObjects, thisObject;

allObjects = document.evaluate("//*[@height='520']", 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allObjects.snapshotLength; i++) {
	thisObject = allObjects.snapshotItem(i);
	thisObject.height = "535";
}

allObjects = document.evaluate("//*[@width='1000']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allObjects.snapshotLength; i++) {
	thisObject = allObjects.snapshotItem(i);
	thisObject.width = "1020";
}

allObjects = document.evaluate("//*[@width='700']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allObjects.snapshotLength; i++) {
	thisObject = allObjects.snapshotItem(i);
	thisObject.width = "720";
}