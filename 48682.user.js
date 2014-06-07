// ==UserScript==
// @name           Lix.in Bypasser
// @namespace      lixin
// @description    Skips Lix.in holding page
// @include        http://lix.in/-*
// ==/UserScript==

var els = document.getElementsByTagName("IFRAME");

if (els && els.length == 1) {
	var el = els[0];
	location.href = el.src;
} else {
	captcha = document.getElementById("ibdc");

	if (!captcha) {
		els = document.getElementsByTagName("INPUT");

		if (els && els.length > 0) {
		 	for (var i = 0; i < els.length; i++) {
				var el = els[i];

				if (el.getAttribute("type") == "submit") {
					el.click();
				}
			}
		}
	}
}