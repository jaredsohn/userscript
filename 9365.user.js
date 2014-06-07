// ==UserScript==
// @name	        		Kill Chase ads
// @version		1.0
// @namespace     	http://greasemonkey.org/download/
// @description		Remove Chase ads
// @include		https://cards.chase.com/*
// ==/UserScript==

var rows = document.evaluate(
    "//comment()[starts-with(string(.),'Ad ')]/following-sibling::*[1]",
	//|comment()[.='End Ad']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i=0; i<rows.snapshotLength; i++) {
    var el = rows.snapshotItem(i);
    el.parentNode.removeChild(el);
}
