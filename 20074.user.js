// ==UserScript==
// @name           Sovserv ignore function
// @namespace      http://sovserv.ru
// @include        http://sovserv.ru/vbb/showthread.php*
// ==/UserScript==

var allDivs, thisDiv;
N = null;
allDivs = document.evaluate(
    "//a[@href='forumdisplay.php?f=44']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	allDivs = document.evaluate(
    "//div[@class='page']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.style.display = 'none'
}
}
