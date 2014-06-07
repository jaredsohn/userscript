// ==UserScript==
// @name RayLogo
// @namespace SDC
// @description achewood logo
// @include http://*.google.*/
// @exclude
// @exclude
// ==/UserScript==
var allEle = document.evaluate("//IMG[@alt='Google']",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);
allEle.snapshotItem(0).src ="http://img3.imageshack.us/img3/1515/googleraysmucklesww5.gif";
allEle.snapshotItem(0).width ="335";
allEle.snapshotItem(0).height ="153";