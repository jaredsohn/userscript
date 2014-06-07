// ==UserScript==
// @name           Fix blankpages issue on 4chan
// @namespace      root
// @include        http://*.4chan.org/*/imgboard.html*
// @include        http://*.4chan.org/*/res/*.html*
// ==/UserScript==

// Self explanatory
const RELOAD_LIMIT = 10;

if (document.body.hasChildNodes()) {
	// Everything OK so we reset the counter
	GM_setValue("reload_counter", 0);
} else {
	// Fuck
	var counter = GM_getValue("reload_counter", 0) + 1;
	if (counter >= RELOAD_LIMIT) {
		// Reset counter
		GM_setValue("reload_counter", 0);
		if (confirm("This shit is fucked yo. Continue reloading?")) {
			window.location.reload();
		}
	} else {
		document.body.innerHTML = "Reloading...";
		GM_setValue("reload_counter", counter);
		window.location.reload();
	}
	
}