// ==UserScript==
// @name         NZBIndex Hide Advanced Search
// @description  Hides the advanced options by default
// @namespace    drnick
// @downloadURL  https://userscripts.org/scripts/source/161253.user.js
// @updateURL    https://userscripts.org/scripts/source/161253.meta.js
// @include      *nzbindex.nl/search/*
// @version      1.0.1
// @grant        none
// ==/UserScript==

(function() {

	// no iframes
	if (window.self != window.top)
		return;

	document.getElementById("advanced").style.display = "none";
	
})();