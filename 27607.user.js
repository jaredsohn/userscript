// ==UserScript==
// @name	Skullz and Flamez beta 0.2.1
// @description	Changes the skin of the Forum
// @include	http://lvt.leet.co.za/*
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
			if(thisElement.title == 'New posts') {
				thisElement.src = 'http://i140.photobucket.com/albums/r28/mike10w/script%201/Flame.jpg';
			}
			else if(thisElement.title == 'No new posts') {
				thisElement.src = 'http://i140.photobucket.com/albums/r28/mike10w/script%201/skull.jpg';
			}
			else if(thisElement.title == 'Sticky') {
				thisElement.src = 'http://i140.photobucket.com/albums/r28/mike10w/script%201/stickey.jpg';
			}
			else if(thisElement.title == 'No new posts [ Locked ]') {
				thisElement.src = 'http://i140.photobucket.com/albums/r28/mike10w/script%201/locked.jpg';
			}
			break;
	}
}
