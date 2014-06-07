// ==UserScript==
// @name           DM of the Rings Enhancer
// @namespace      http://freecog.net/2007/
// @description    Adds keyboard shortcuts for navigation and scrolls down to the comic.
// @include        http://shamusyoung.com/twentysidedtale/?p=*
// @include        http://www.shamusyoung.com/twentysidedtale/?p=*
// ==/UserScript==

var images = document.getElementsByTagName("img");

var next_url, prev_url, comic_found;

var comics = Array.forEach(images, function(img) {
	if ((img.alt.match(/^Lord of the Rings/) || img.src.match(/\/comic[^\/]+$/)) && !img.src.match(/header\.jpg/)) {
		if (!comic_found) {
			var offset = get_page_location(img);
			window.scrollTo(offset.x, offset.y - 10);
			comic_found = true;
		}
	} else if (img.alt.match(/Next Comic/)) {
		next_url = img.parentNode.href;
	} else if (img.alt.match(/Previous Comic/)) {
		prev_url = img.parentNode.href;
	}
});

window.addEventListener("keypress", function(evt) {
	if (evt.charCode == "n".charCodeAt(0)) {
		if (next_url) document.location = next_url;
	} else if (evt.charCode == "b".charCodeAt(0)) {
		if (prev_url) document.location = prev_url;
	}
}, false);


function get_page_location(node) {
	var x = y = 0;
	while (node.offsetParent) {
		x += node.offsetLeft;
		y += node.offsetTop;
		node = node.offsetParent;
	}
	return {x: x, y: y};
}
