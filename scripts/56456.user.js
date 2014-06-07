// ==UserScript==
// @name           Dragon Wars Shield of the Red Drake Fixer
// @namespace      *
// @description    Fixes the visualization bug of the Shield of the Red Drake on Facebook
// @include        http://apps.facebook.com/dragonwars/stats.php
// @include        http://apps.facebook.com/dragonwars/epic.php
// ==/UserScript==
//
//  v 1.1 by CloudStrife
//
//  This script changes the picture url of the Shield of the Red Drake with a
//  working one, ever from Zynga server but on the myspace side.
//
//  This way it shows in your inventory.

var wrongurl = 'http://sh5tg2.static.zynga.com/project7_facebook/40178/graphics/shield_dragon_sm.jpg';  //wrong url
var fixedurl = 'http://sh5tg2.static.zynga.com/project7_myspace/40178/graphics/shield_dragon_sm.jpg';	//fixed url
var wrongurl1 = 'http://sh5tg2.static.zynga.com/project7_facebook/40178/graphics/item_scarecrowScythe.gif.gif';  //wrong url
var fixedurl1 = 'http://sh5tg2.static.zynga.com/project7_facebook/40178/graphics/item_scarecrowScythe.gif';	//fixed url


var allImgs, thisImg;
allImgs = document.evaluate(
    '//img',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allImgs.snapshotLength; i++) {
    thisImg = allImgs.snapshotItem(i);
    if (thisImg.src.match(wrongurl)) {
		thisImg.src = thisImg.src.replace(wrongurl, fixedurl);
	}
    else if (thisImg.src.match(wrongurl1)) {
		thisImg.src = thisImg.src.replace(wrongurl1, fixedurl1);
	}
}
