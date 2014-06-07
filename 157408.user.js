// ==UserScript==
// @name        White Ninja Big Navigation
// @description Resizes the navigation pictures of the White Ninja Comics
// @match		http://*.whiteninjacomics.com/comics/*.shtml
// @version     1.3
// @namespace   white.ninja.comic.navi
// ==/UserScript==



var allDivs, thisDiv, old,ne;
allDivs = document.evaluate(
    "//img[@src='\/images\/previous.jpg']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	old=document.createElement("old");
	old.innerHTML='<img src="/images/previous.jpg" height="63" width="93">';
	thisDiv.parentNode.replaceChild(old, thisDiv);

}
allDivs = document.evaluate(
    "//img[@src='\/images\/next.jpg']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	ne=document.createElement("ne");
	ne.innerHTML='<img src="/images/next.jpg" height="63" width="99">';
	thisDiv.parentNode.replaceChild(ne, thisDiv);

}
