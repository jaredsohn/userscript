// ==UserScript==
// @name	Google Droidifier (Web font)
// @namespace	http://labs.rbardini.com/
// @description	Change fonts on all Google sites to Droid Sans
// @author	Rafael Bardini
// @version	1.0
// @include	http://*.google.*/*
// @include	https://*.google.*/*
// ==/UserScript==

(function(font) {
	var	head = document.getElementsByTagName('head')[0],
		link = document.createElement('link'),
		style = document.createElement('style'),
		rules = document.createTextNode('body * { font-family: "' + font.family + '", arial, sans-serif !important }');
	
    link.rel  = 'stylesheet';
	link.href = 'http://fonts.googleapis.com/css?family=' + font.family + ':' + (font.style || []) + '&subset=' + (font.subset || ['latin']);
	head.appendChild(link);
	
	style.styleSheet ? style.styleSheet.cssText = rules.nodeValue : style.appendChild(rules);
	head.appendChild(style);
})({ family:'Droid Sans', style:['400','700'] });
