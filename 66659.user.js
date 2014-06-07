// ==UserScript==
// @name           Megaupload Popup Blocker
// @namespace      http://turnor.co.uk/scripts/
// @description    Prevents popup ads on Megaupload.
// @include        http://www.megaupload.com/*
// ==/UserScript==

(function() {

	unsafeWindow.open = function(a,b,c) {
		// Do nothing
	};

})();