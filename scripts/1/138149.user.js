// ==UserScript==
// @name        Watchseries.eu advertisement overlay removal
// @namespace   watchseries
// @description	Removes the annoying advertisement overlay on the index page of watchseries.eu
// @author		moezzie
// @description Removes the overlay at the indexpage
// @include     http://*watchseries.eu/*
// @version     1.0
// ==/UserScript==

(function () {
	overlay = document.getElementById("mg_overlay");
	overlay_window = document.getElementById("mg_overlay_window");

	overlay.parentNode.removeChild(overlay);
	overlay_window.parentNode.removeChild(overlay_window);
})();