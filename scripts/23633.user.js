// ==UserScript==
// @name           href in tooltip
// @namespace      wirespot
// @description    Copy href from all links to their title, to show as tooltip.
// @include        *
// ==/UserScript==

(function () {
var res = document.evaluate("//a", 
	document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var i, e;
for (i=0; e=res.snapshotItem(i); i++) {
    e.title = (''==e.title ? e.href : e.title+' <'+e.href+'>');
}
})();
