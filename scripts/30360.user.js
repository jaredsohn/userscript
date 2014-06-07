// ==UserScript==
// @name            WorthPlaying Popup Fixer
// @namespace       http://www.lostrealm.com/code/greasemonkey/wp-popup-fixer/
// @description     Silly people and their javascript popups
// @include         http://www.worthplaying.com/*
// @include         http://worthplaying.com/*
// ==/UserScript==
//
// Bits borrowed from here and there and everywhere,
// so feel free to steal this code too.

(function ()
{
	var candidates = document.getElementsByTagName("a");

	for (var cand = null, i = 0; (cand = candidates[i]); i++) {
		if (cand.href.toLowerCase().indexOf("javascript:") == 0) {
			match = cand.href.match(/(popUp\('([^']+)'\))/);

			if (match != null) {
				cand.setAttribute("href", match[2]);
			}
		}
	}
})();