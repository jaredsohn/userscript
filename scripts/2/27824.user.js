// ==UserScript==
// @name	Travian Burger eater
// @description	lol
// @include	http://*.travian*.*/*.php*
// ==/UserScript==

var allElements, thisElement;
allElements = document.evaluate(
    '//*[@title]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

GM_log(allElements.snapshotLength);

for(var i = 0; i < allElements.snapshotLength; i++) {
	thisElement = allElements.snapshotItem(i);
	switch (thisElement.nodeName.toUpperCase()) {
		case 'IMG':
			if(thisElement.title == 'Crop consumption') {
				thisElement.src = 'http://i140.photobucket.com/albums/r28/mike10w/burgereater.jpg';
			}
			break;
	}
}