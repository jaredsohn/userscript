// ==UserScript==
// @name           Kongregate-IndestructoTankAE-Bigger
// @description    Makes the game 25% bigger
// @include        http://*.kongregate.com/games/ArmorGames/indestructotank-ae*
// ==/UserScript==

var allObjects, thisObject;

allObjects = document.evaluate("//*[@id='maingameholder']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allObjects.snapshotLength; i++) {
	thisObject = allObjects.snapshotItem(i);
	thisObject.width = "820";
}

allObjects = document.evaluate("//*[@width='700']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allObjects.snapshotLength; i++) {
	thisObject = allObjects.snapshotItem(i);
	thisObject.width = "800";
}

allObjects = document.evaluate("//*[@height='335']", 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allObjects.snapshotLength; i++) {
	thisObject = allObjects.snapshotItem(i);
	thisObject.height = "419";
}

allObjects = document.evaluate("//*[@width='400']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allObjects.snapshotLength; i++) {
	thisObject = allObjects.snapshotItem(i);
	thisObject.width = "500";
}