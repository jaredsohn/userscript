// ==UserScript==
// @name           Bob's Open Dir Viewer
// @namespace      lenzm.net
// @include        *
// ==/UserScript==

function xpath(query) {
	return document.evaluate(query, document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function addImages() {
	var max = 1000;
	var links = xpath("//a[@href]");
	for (var i = 0; i < links.snapshotLength && i < max; i++) {
		var a = links.snapshotItem(i);
		if (a.href.match(/\.(jpg|jpeg|gif|png)$/i)) {
			a.innerHTML = "<img src=\"" + a.href + "\">";
		}
	}
}

var title = document.getElementsByTagName('title')[0].innerHTML;
if(title.match(/^Index of /)) {
	addImages();
