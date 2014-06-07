// ==UserScript==
// @name			eRepDroid
// @namespace			kimiamania
// @description			Change fonts on all eRepublik pages to Droid Sans
// @author			Dimitri Mendeleev http://www.erepublik.com/en/citizen/profile/3048943
// @version			1.0
// @include			http://www.erepublik.com/*
// @updateURL		        https://userscripts.org/scripts/source/154920.meta.js
// @downloadURL		        https://userscripts.org/scripts/source/154920.user.js
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