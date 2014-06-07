// ==UserScript==
// @name          YouTube thumbnail animator
// @namespace     http://henrik.nyh.se
// @description   Animates YouTube movie thumbnails between three snapshots.
// @include       http://youtube.com/*
// @include       http://www.youtube.com/*
// ==/UserScript==

var thumbs_xpath = "//img[starts-with(@class, 'vimg')]";
var interval = 600;  // milliseconds


setInterval(rotate_thumbs, interval);

var thumbs = $x(thumbs_xpath);
function rotate_thumbs() {
	with_each(thumbs, function(thumb) {
		thumb.src = thumb.src.replace(/(\d)(.jpg)$/, rotate_replace);
	});
}

function rotate_replace(string, filename, suffix) {
	var new_filename = parseInt(filename)%3+1;
	return new_filename + suffix;
}


function $x(xpath, root) {  // From Johan Sundström
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
	while(next = got.iterateNext())
		result.push(next);
	return result;
}

function with_each(nodes, cb, root) {
	for (var i = 0, j = nodes.length; i < j; i++)
		cb(nodes[i]);
}
