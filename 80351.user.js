// ==UserScript==
// @name           Transformice Scroll Fix
// @namespace      http://cn-tci.com
// @include        *.transformice.com*
// ==/UserScript==

var swf = document.getElementsByTagName('object')[0];

swf.addEventListener(
	'DOMMouseScroll',
	function(e) {
		e.preventDefault();
	},
	false
);