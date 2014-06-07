// ==UserScript==
// @name           iPhoneDespammer
// @namespace  http://spod-central.org/~osb/code/
// @description Remove every link containing the string "iPhone"
// @include        *
// ==/UserScript==

var tubes = document.evaluate(
	'//a[contains(@href, "iphone")]',
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
);

var tube;
for (var i=0; i<tubes.snapshotLength; i++) {
	tube = tubes.snapshotItem(i);
	tube.parentNode.removeChild(tube);
}
