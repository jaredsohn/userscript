// ==UserScript==
// @name         Delicious.com Thumbs
// @description  Add thumbnail previews to bookmarks on Delicious.com.
// @include      http://delicious.com/*
// @include      http://www.delicious.com/*
// ==/UserScript==

function init() {
	var list = document.getElementById('bookmarklist');
	if (list.className.indexOf('NOTHUMB') != -1 || list.className.indexOf('FULL') != -1) {
		add_style();
		var links = list.getElementsByTagName('a');
		for (var i = links.length - 1; i >= 0; i--) {
			if (links[i].href.indexOf('delicious.com') == -1) {
				links[i].target = '_blank';
				if (links[i].className.indexOf('taggedlink') != -1)
					add_thumbnail(links[i]);
			}
		}
	}
}

function add_thumbnail(link) {
	var bm = link.parentNode.parentNode;
	var a = document.createElement('a');
	a.href = link.href;
	a.target = '_blank';
	a.className = 'image';
	var img = document.createElement('img');
	img.src = 'http://open.thumbshots.org/image.pxf?url=' + link.href;
	a.appendChild(img);
	bm.parentNode.insertBefore(a, bm);
}

function add_style() {
	var css = '.bookmark .image { left:5px; }';
	css += '.bookmark .image img { width:75px; height:55px; }';
	css += '.post .bookmark { clear:both; min-height:70px; padding-left:95px; }';
	css += 'ul.bookmarks li.post .meta {clear:none; }';
	css += 'ul.bookmarks li.post .description {clear:none; width:auto; max-width:100%;}';
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode(css));
	document.getElementsByTagName('head')[0].appendChild(style);
}

init();
