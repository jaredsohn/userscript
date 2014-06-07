// ==UserScript==
// @name         Pretty Cards for Pokerhand.org
// @description	 Displays hand histories on Pokerhand.org with prettier cards
// @include      http://*.pokerhand.org/?*
// @include      http://pokerhand.org/?*
// ==/UserScript==
//

// match properly for www.pokerhand.org and pokerhand.org
var origpath = window.location.host;
var origpath2 = window.location.host;
var origpath3 = window.location.host;
origpath += '/_img/big_four/';
origpath2 += '/_img/standard/';
origpath3 += '/_img/standard_four/';
// location of replacement cards
var newpath = 's3.hayguys.us/deck/';


var allImgs, thisImg;
allImgs = document.evaluate(
    '//img',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allImgs.snapshotLength; i++) {
    thisImg = allImgs.snapshotItem(i);
    if (thisImg.src.match(origpath)) {
		thisImg.src = thisImg.src.replace(origpath, newpath);
		// my cards are PNGs instead of GIFs
		// (change as needed)
		thisImg.src = thisImg.src.replace('gif', 'png');
    }
    else if (thisImg.src.match(origpath2)) {
		thisImg.src = thisImg.src.replace(origpath2, newpath);
		thisImg.src = thisImg.src.replace('gif', 'png');
	}
    else if (thisImg.src.match(origpath3)) {
		thisImg.src = thisImg.src.replace(origpath3, newpath);
		thisImg.src = thisImg.src.replace('gif', 'png');
	}
}