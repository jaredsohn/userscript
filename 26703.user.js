// ==UserScript==
// @name           Reddit, change link target to blank
// @description    Changes the link target for reddit.com to _blank so the links will open in a new window. 
// @namespace      StevesStuff
// @include        http://reddit.com/
// ==/UserScript==

var allA, thisA;
allA = document.evaluate(
    "//A[@class='title']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
 for (var i = 0; i < allA.snapshotLength; i++) {
    thisA = allA.snapshotItem(i);
		thisA.removeAttribute("onmousedown");
		thisA.setAttribute("target","_blank");
}