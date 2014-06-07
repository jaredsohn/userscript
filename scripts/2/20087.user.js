// ==UserScript==
// @name           Sovserv ignore function users edition
// @namespace      http://sovserv.ru
// @include        http://sovserv.ru/vbb/showthread.php*
// ==/UserScript==

var allDivs, thisDiv, N,  newele, thisA, allA;
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
