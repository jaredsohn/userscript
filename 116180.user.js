// ==UserScript==
// @name	Google Droidifier (Local font)
// @namespace	http://labs.rbardini.com/
// @description	Change fonts on all Google sites to Droid Sans
// @author	Rafael Bardini
// @version	1.0
// @include	http://*.google.*/*
// @include	https://*.google.*/*
// ==/UserScript==

(function() {
	var head = document.getElementsByTagName('head')[0],
		style = document.createElement('style'),
		rules = document.createTextNode('body * { font-family: "Droid Sans", arial, sans-serif !important }');
	style.styleSheet ? style.styleSheet.cssText = rules.nodeValue : style.appendChild(rules);
	head.appendChild(style);
})();
