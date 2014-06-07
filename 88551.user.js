// ==UserScript==
// @name Remove ad box on libre.fm.
// @namespace http://draconx.ca
// @description Simple script to remove the ugly ad box on libre.fm.
// @include http://alpha.libre.fm/*
// ==/UserScript==

(function () {
	var adbox = document.getElementById('ad');
	if (adbox) {
		adbox.parentNode.removeChild(adbox);
	}

	var footer = document.getElementById('footer-content');
	if (footer) {
		footer.style.marginLeft  = 'auto';
		footer.style.marginRight = 'auto';
	}
})();
