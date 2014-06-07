// ==UserScript==
// @name           Tumblr Flipcards
// @namespace      http://zetx.tumblr.com/
// @description    Quick fix for Tumblr's seemingly over-extending flipcard_back style
// @include        http://www.tumblr.com/dashboard*
// ==/UserScript==

/*

(C) 2011 Caleb Leung
Creative Commons Attribution-ShareAlike 3.0 Unported License (http://creativecommons.org/licenses/by-sa/3.0/)

6/20 - For Jamie.

*/

var tag = document.createElement('style');

var style = ' \
	.flipcard .flipcard_back \
	{ \
		min-height: 0px; \
	}';
	
tag.setAttribute('type', 'text/css');
tag.textContent = style.toString();
document.head.appendChild(tag);
