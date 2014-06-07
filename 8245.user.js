// ==UserScript==
// @name           CodeReader
// @namespace      http://www.strongasanox.co.uk/greasemonkey
// @description    Increases the font size for code snippets in Google Reader items
// @include        http://www.google.com/reader/view/*
// ==/UserScript==

// Version 1 (2007-03-30)
//  - 	Adds a rule to the last stylesheet to display <pre> and <code>
//		tags in elements with the class of .item-body at a larger font-soze
(function() {
	window.addEventListener('load', function() {
		if (document.styleSheets) {
			var totalCss = document.styleSheets.length;
			
			var lastCss = document.styleSheets[totalCss - 1];
			var totalRules = lastCss.cssRules.length;
			lastCss.insertRule('.item-body pre, .item-body code { font-size:1.2em; }', totalRules);
		}
	},
	true);
})();
