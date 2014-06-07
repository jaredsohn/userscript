// ==UserScript==
// @name       E2CT
// @namespace  http://userscripts.org/scripts/edit/148971
// @version    1.1
// @description  Press ESC twice to close tab
// @match      *://*/*
// ==/UserScript==

var first_press = false;

window.addEventListener("keydown", function(e) {
	if (first_press && e.keyCode == 27) {
		window.opener = null;
		window.close();
		first_press = false;
	} else {
		first_press = true;
		// second press time duration
		window.setTimeout(function() {
			first_press = false;
		}, 500);
	}
}, false);