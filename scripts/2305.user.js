// ==UserScript==
// @name           The Pirate Bay autoreload at search unavailable
// @namespace      http://henrik.nyh.se
// @description    Re-attempts (reloads) search every N seconds when faced with "Search not available right now, try again later."
// @include        http://*thepiratebay.org/search.php?*
// ==/UserScript==

// Update every N seconds.
// Keep in mind that frequent updates will put more stress on TPB's servers.

var time = 3;  // Default is 3 seconds


if (!document.title) {  // No title? We're at the "Search not available right now, try again later." screen!

	document.title = "Loading The Pirate Bay...";
	document.body = document.createElement('body');
	document.body.innerHTML = "Search not available right now, but retrying every " + (time == 1 ? 'second' : time+' seconds') + "&hellip;";
	
	setTimeout(function() {
		location.reload();
	}, time*1000);

}
