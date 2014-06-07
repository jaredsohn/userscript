// ==UserScript==
// @name		Firefox Extensions 50 on a page
// @namespace		None
// @description		Display 50 extensions per page instead of the usual 20.
// @include		https://addons.mozilla.org/extensions/*
// ==/UserScript==

if(location.href.search("addons.mozilla.org/extensions/*") >= 0) {
	if(location.href.search("&numpg=50") == -1) {
		location.href += "&numpg=50";
	}
}	
