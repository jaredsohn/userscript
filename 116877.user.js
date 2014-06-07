// ==UserScript==
// @name           Compressed Reader
// @namespace      http://gostomski.co.uk
// @include        http://www.google.com/reader/view/
// ==/UserScript==

(function() {
	var head, style;
	head			= document.getElementsByTagName('head')[0];
	style			= document.createElement('style');
	style.type		= 'text/css';
	style.innerHTML	= "#entries.list .entry .collapsed {line-height: 2.2ex; height: 12px}";
	head.appendChild(style);
})();
