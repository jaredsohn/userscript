// ==UserScript==
// @name           UnFlasher
// @namespace      idsfa
// @description    Replaces annoying Fark newsflash tag with news tag
// @include        http://www.totalfark.com/
// @include        http://www.fark.com/
// ==/UserScript==


var allNewsFlash, thisNewsFlash;

allNewsFlash = document.evaluate(
"//img[@src='http://img1.fark.net/images/2001/topics/newsflash.gif']",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);

for (var i = 0; i thisNewsFlash = allNewsFlash.snapshotItem(i);
// do something with thisNewsFlash
thisNewsFlash.src='http://img1.fark.net/images/2001/topics/news.gif';
}