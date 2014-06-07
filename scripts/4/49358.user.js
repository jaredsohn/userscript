// ==UserScript==
// @name	Travian crop usage stick figure
// @description	lol
// @include	http://*myspace.com*
// ==/UserScript==

var allElements, thisElement;
allElements = document.evaluate(
    '//*[@Location]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

GM_log(allElements.snapshotLength);

for(var i = 0; i < allElements.snapshotLength; i++) {
	thisElement = allElements.snapshotItem(i);
	switch (thisElement.nodeName.toUpperCase()) {
		case 'IMG':
			if(thisElement.Title == 'Expand Bar') {
				thisElement.src = 'http://i140.photobucket.com/albums/r28/mike10w/stickfigure.jpg';
			}
			break;
	}
}