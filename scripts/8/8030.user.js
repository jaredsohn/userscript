// ==UserScript==
// @name          Google Apps Search Focuser
// @description   Focuses the search bar on the Google App's Home page.
// @namespace     Adrian232
// @include       http://partnerpage.google.com/*
// ==/UserScript==

(function() {
	var form = document.getElementsByTagName("form")[0];
	if (form) {
		var inputs = form.getElementsByTagName("input");
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].type == "text") {
				inputs[i].focus();
				return;
			}
		}
	}
})();
