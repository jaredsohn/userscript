// ==UserScript==
// @name Disable Google "Everything Bar"
// @namespace http://draconx.ca
// @description Simple script to unfuck the google search page.
// @include http://www.google.*/search*
// @include https://encrypted.google.*/search*
// ==/UserScript==

(function () {
	var leftnav = document.getElementById('leftnav');
	if (leftnav) {
		leftnav.parentNode.removeChild(leftnav);
	}

	var center = document.getElementById('center_col');
	if (center) {
		center.style.borderLeft  = '0px';
		center.style.marginLeft  = '1em';
		center.style.marginRight = '1em';
	}

	var foot = document.getElementById('foot');
	if (foot) {
		foot.style.marginLeft  = 'auto';
		foot.style.marginRight = 'auto';
	}
})();
