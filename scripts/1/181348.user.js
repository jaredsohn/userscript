// ==UserScript==
// @name        https://www.unitedbankofmichigan.com/
// @namespace   https://www.unitedbankofmichigan.com/
// @include     https://www.unitedbankofmichigan.com/
// @version     1
// @grant       none
// ==/UserScript==

document.getElementById('Text1').onkeypress = function(e) {
	if (e.which == 13)
		document.getElementById('ibLogin').click();
};