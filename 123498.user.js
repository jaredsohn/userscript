// ==UserScript==
// @name           Yahoo News Privacy
// @namespace      download
// @description    Basically googlePrivacy for Yahoo News
// @include        http://news.yahoo.com/*
// ==/UserScript==

addEventListener('load', init, false);
document.addEventListener('mousedown', function(e) {
	if(e.target.localName == 'a') {
		sanitizeLink(e.target);
	}
}, true);

function init() {
	var slice = Array.prototype.slice;
	var links = document.querySelectorAll('a');
	links = slice.call(links, 0);
	links.forEach(sanitizeLink);
}

function sanitizeLink(a) {
	var copy = a.cloneNode(true);
	var parent = a.parentNode;
	parent.insertBefore(copy, a);
	parent.removeChild(a);
	a = copy;
	
	var href = a.href;
	var pos = href.indexOf('**');
	if(pos != -1) {
		href = decodeURIComponent(href.substr(pos + 2));
		a.href = href;
	}
}