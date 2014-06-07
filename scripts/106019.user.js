// ==UserScript==
// @name        Google+ Dock Badge
// @namespace   http://fluidapp.com
// @description Displays Google+'s notification count on the dock icon badge for a Google+ Fluid.app.
// @include     *
// @author      James Farwell
// ==/UserScript==

window.fluid.dockBadge = '';
setTimeout(updateDockBadge, 1000);
setTimeout(updateDockBadge, 3000);
setInterval(updateDockBadge, 5000);

function updateDockBadge() {
	var newBadge = '';
	var notifications = document.getElementById("gbi1");
	if (notifications.innerHTML > 0) {
		newBadge = notifications.innerHTML;
	}
	window.fluid.dockBadge = newBadge;
}

