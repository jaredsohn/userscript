// ==UserScript==
// @name           Woot reload
// @namespace      http://freecog.net/2008/
// @description    Automatically reload
// @include        http://www.woot.com/
// ==/UserScript==

var title = document.getElementById("TitleHeader").textContent;

var do_reload = true;

window.addEventListener("click", function() {
	do_reload = false;
	document.title = "Reload cancelled";
}, false);

var countdown = 31;

(function() {
	if (do_reload) {
		countdown--;
		if (countdown < 0) {
			document.location.reload();
			document.title = "Reloading";
		} else {
			document.title = countdown + " " + title;
			window.setTimeout(arguments.callee, 1000);
		}
	}
})();
