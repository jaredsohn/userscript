// ==UserScript==
// @name Block Ad
// @namespace http://example.com/
// @description Blocking ads
// @include *
// ==/UserScript==

var adSidebar = document.getElementsByTagName ('ads');
	if (adSidebar) {
		adSidebar.parentNode.removeChild(adSidebar);
	}

