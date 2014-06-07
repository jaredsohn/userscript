// ==UserScript==
// @author         Casla
// @name           GameSpy Adds Remover
// @namespace      http://diveintomark.org/projects/greasemonkey/
// @description    Removes GameSpy Adds
// @include        http://*.gamespy.com/*
// ==/UserScript==

(function() {
	
	var adwrap = document.getElementById('ad-wrap');
	var mediumRectangleAd = document.getElementById('MediumRectangleAd');
	
	if (adwrap) {
		adwrap.parentNode.removeChild(adwrap);
	}
	if (mediumRectangleAd) {
		mediumRectangleAd.parentNode.removeChild(mediumRectangleAd);
	}

})();
