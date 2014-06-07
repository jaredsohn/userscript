// ==UserScript==
// @name        NP Redirect
// @include     *np.reddit.com/*
// @grant	none
// ==/UserScript==

(function() {
	// Probably some cases that break this. Maybe.
	location.replace(window.location.toString().replace("np.reddit", "reddit" ));
})();