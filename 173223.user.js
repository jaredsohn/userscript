// ==UserScript==
// @name        abook.ws
// @namespace   abookws
// @description Generates links on abook.ws forum
// @include     http://abook.ws/index.php?topic=*
// @version     1
// @require     http://code.jquery.com/jquery.min.js
// @grant       none
// ==/UserScript==

// Included on page
var $ = jQuery;
var boxes = $.find("pre > code.bbc_code");

var n = boxes.length
for(var i=0; i < n; i++) {
	var box = $(boxes[i]);
	var text = box.text();
	box.html('<a target="_blank" href="http://www.nzbindex.nl/search/?q=' + text + '">'+ text + "</a>");
}
