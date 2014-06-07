// ==UserScript==
// @id	hide_google_plus_notification_pokerface
// @name	Go Away! Google Plus
// @updateURL      http://userscripts.org/scripts/source/120626.meta.js
// @namespace	in.co.tossing.hidegoogleplus
// @version	0.2
// @author	Pokerface - Kevin
// @website	http://userscripts.org/scripts/show/120626
// @description	Hide Google Plus Notification and Share button
// @include	*://*.google.*/*
// @exclude	*://plus.google.com/*
// ==/UserScript==

(function () {

// gbg1 - notification
removeElement("#gbg1");
// gbg3 - share button
removeElement("#gbg3");
// gbwc - plus notification page
//removeElement(".gbto");
removeElement("#gbwc");

function removeElement($e) {
	var check;
	check = (function($e) {
		return function() {
			var e = document.querySelector($e);
			if (e)
				e.parentNode.removeChild(e);
			else
				setTimeout(check, 500);
		}
	})($e);
	check();
}

})();