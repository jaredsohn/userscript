// ==UserScript==
// @name           Hacker News NoScroll
// @namespace      hnnoscroll
// @include        http://news.ycombinator.com/*
// ==/UserScript==

var pre = document.getElementsByTagName ('pre');

for (var p in pre) {
	pre [p].style.overflow = 'auto';
	pre [p].style.width = '800px';
}