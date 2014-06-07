// ==UserScript==
// @name           Twitter - Scroll Friends
// @namespace      http://www.twitter.com/adriangrigore
// @description    Temporary fix to enable scrolling on the friends pages
// @include        http://twitter.com/friends*
// @include        http://twitter.com/*/friends*
// @include        http://www.twitter.com/friends*
// @include        http://www.twitter.com/*/friends*
// ==/UserScript==

(function () {
	var body = document.getElementsByTagName('body')[0];
	body.style.overflow = 'auto';
})()