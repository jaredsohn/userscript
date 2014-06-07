// ==UserScript==
// @name        LighthouseScrollbarFix
// @namespace   http://fluidapp.com
// @description Removes the forced scrollbars in Lighthouse
// @include     *.lighthouseapp.com/*
// @author      Thomas Aylott / subtleGradient
// ==/UserScript==

(function () {
	if (window.fluid) {
		document.getElementsByTagName('html')[0].style.margin = 0;
		console.log('Lack of scrollbars brought to you by… subtleGradient.com, enjoy!');
	}
})();
