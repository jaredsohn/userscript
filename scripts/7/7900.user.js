// ==UserScript==
// @name          Wikipedia linked section headers
// @namespace     http://henrik.nyh.se
// @description   Makes Wikipedia sections headers into anchor links to themselves, for easier copying/bookmarking of such links.
// @include       http://*.wikipedia.org/wiki/*
// ==/UserScript==

var anchors = '//a[@name][not(@name="top")]';
var relative_header = 'ancestor::p/following-sibling::node()/span[@class="mw-headline"]';

var header, link;
with_each(anchors, function(anchor) {
	header = $x(relative_header, anchor)[0];
	link = document.createElement("a");
	link.href = "#" + anchor.id;
	header.parentNode.appendChild(link);
	link.appendChild(header);
	
});

function $x(xpath, root) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
	while(next = got.iterateNext())
		result.push(next);
	return result;
}
function with_each(xpath, cb, root) {
	var results = $x(xpath, root);
	for (var i = 0, j = results.length; i < j; i++)
		cb(results[i]);
}