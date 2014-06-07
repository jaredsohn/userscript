// ==UserScript==
// @name           Always forget 11/9
// @namespace      *
// @description    Removes 9/11 remembrance line from google.com homepage
// @include        http://www.google.com/
// ==/UserScript==

var allA, thisA;
allA = document.evaluate(
    "//a[@href='http://googleblog.blogspot.com/2011/09/ten-years-later.html']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allA.snapshotLength; i++) {
    thisA = allA.snapshotItem(i);
		thisA.parentNode.removeChild(thisA);
}

var allI, thisI;
allI = document.evaluate(
    "//img[@alt='Remembering 9/11']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allI.snapshotLength; i++) {
    thisI = allI.snapshotItem(i);
		thisI.parentNode.removeChild(thisI);
}
