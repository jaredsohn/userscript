// ==UserScript==
// @name           wired_full_gallery
// @namespace      http://www.comedicironpyrite.com/022509.invalid
// @description    Redirects applicable Wired galleries to their single page 'View All' format
// @include        http://www.wired.com/*
// @match          http://www.wired.com/*
// @version        1.1 2012-05-12
// ==/UserScript==

/* Written 2010 by Gillelmus*/
/* Added @match for Chrome users*/


var myloc = window.location.href
var myparam = /viewall\=true/
var PageElementId = document.getElementById('blog_slideshow_previous_next_bottom');

if (myloc.match(myparam)) {
//do nothing
}
else {
	if (PageElementId) {
		if (myloc.match(/\?/)) {
		window.location.href = window.location.href += '&viewall=true';
		}
		else {
		window.location.href = window.location.href += '?viewall=true';
		}
	}
}