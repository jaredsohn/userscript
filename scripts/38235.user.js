// ==UserScript==
// @name RayLogo
// @namespace SDC
// @description achewood logo
// @include http://www.google.com/
// @exclude
// @exclude
// ==/UserScript==
var allEle = document.evaluate("//IMG[@alt='Google']",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);
allEle.snapshotItem(0).src ="http://farm1.static.flickr.com/150/393366534_d37972fd53.jpg?v=0";