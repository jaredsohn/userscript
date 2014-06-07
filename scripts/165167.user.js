// ==UserScript==
// @name       Webwereld non-bejaarden fontsize
// @version    0.21
// @description  enter something useful // DOE HET LEKKER ZELF
// @include      http://webwereld.nl/*
// @include      http://*.webwereld.nl/*
// @copyright  2013+, @vonloghausen
// ==/UserScript==

(function() {
	var addCSS = function() {
		var style = document.createElement('style'),
		rules =
		'#sideBar, #sideBar.article, #sideBar.category, #contentColumn, #techimageWrapper, #navBar {font-size: 14px;}';

		if(style.styleSheet) {
			style.styleSheet.cssText = rules;
		} else {
			style.appendChild(document.createTextNode(rules));
		}

		document.getElementsByTagName('head')[0].appendChild(style);
	}

	addCSS();
	console.log('Webwereld non-bejaarden fontsize loaded');
})();
