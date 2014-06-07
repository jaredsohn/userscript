// ==UserScript==
// @name          Flickr - View in Slideshowr
// @namespace     http://www.adamfranco.com/
// @description   Replaces links to "View as slideshow" for sets so that they open in Slideshowr
// @include       http://*flickr.com/*
// ==/UserScript==

var links = document.evaluate(
	"//a[contains(@href, '/show/')]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < links.snapshotLength; i++) {
	var a = links.snapshotItem(i);
	
	// Sets
	var matches = a.href.match(/\/sets\/([0-9]+)\/show\//);
	if (matches.length)
		a.href = "http://slideshowr.org/slideshowr/slideshow?photo_set=" + matches[1] + "&per_page=250&slideshow_title=&song=---&search_type=photo_set&feed_version=2&photo_set_title=&photo_size=b";
	
	// Photostream
		// todo...
	
	// Tags
		// todo...
}