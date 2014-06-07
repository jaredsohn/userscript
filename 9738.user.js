// ==UserScript==
// @name           DarkLyrics link fixer
// @namespace      http://steelpangolin.example.org/
// @description    stops links from opening in new windows
// @include        http://*.darklyrics.com/*
// ==/UserScript==

main();

function clone(what) {
	var r = new Array(what.length);
	for (q in what) {
		r[q] = what[q];
	}
	return r;
}

function cloneX(what) {
	var r = new Array(what.snapshotLength);
	for (var q = 0; q < what.snapshotLength; q++) {
		r[q] = what.snapshotItem(q);
	}
	return r;
}

function xpath(context, query) {
	return cloneX(document.evaluate(query, context, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null));
}

function xpath1(context, query) {
	var result = xpath(context, query);
	if (result.length == 0) {
		return null;
	} else {
		return result[0];
	}
}

function main() {
	var links = xpath(document, "//a[@target]");
	for (i in links) {
		links[i].removeAttribute('target');
	}
}