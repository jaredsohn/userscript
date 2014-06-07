// ==UserScript==
// @name           Terror Island Enhancer
// @namespace      http://freecog.net/2006/
// @description    Shows the "title text" for comics below the comic.
// @include        http://terrorisland.net/
// @include        http://www.terrorisland.net/
// @include        http://terrorisland.net/strips/*.html
// @include        http://www.terrorisland.net/strips/*.html
// ==/UserScript==

Array.slice(document.getElementsByTagName('span')).filter(function(node) {
	return node.className.match(/(^|\s)rss-content(\s|$)/);
}).forEach(function insert_p(node) {
	var img = node.getElementsByTagName('img')[0];
	if (!img || !img.title) return;
	var p = document.createElement('p');
	with (p.style) {
		padding = '0';
		margin = '-3px auto 0 auto';
		backgroundColor = '#ddd';
		color = 'black';
		width = (img.width - 4*2) + 'px';
		borderBottom = borderLeft = borderRight = '1px solid black';
		padding = '4px';
		fontSize = '14px';
		minHeight = '34px'; // Don't shift the nav around so much.
	}
	function set_width() {
		p.style.width = (img.width - 4*2) + 'px';
	}
	set_width();
	// If the image hasn't loaded, make sure that the paragraph's width
	// is set correctly when it does.
	img.addEventListener('load', set_width, false);
	p.appendChild(document.createTextNode(img.title));
	if (img.nextSibling) {
		img.parentNode.insertBefore(p, img.nextSibling);
	} else {
		img.parentNode.appendChild(p);
	}
});