// ==UserScript==
// @name           GoogleMapsScrollZoomDisable
// @namespace      http://markbuer.blogspot.com
// @description    Disables Google Maps Scroll-Zoom (Main map page only)
// @include        http://maps.google.co.uk/
// ==/UserScript==

window.addEventListener('load', function() {

	function noScrollZoomWait() {
		var gApp = unsafeWindow.gApplication;
		if (gApp == null) {
			console.log('gApplication not ready. Waiting...');
			window.setTimeout(noScrollZoomWait, 100);
		} else {
			console.log('gApplication found. Disabling scroll zoom.');
			gApp.getMap().Sva();
		}
	}

	// Ensure this script only gets run once???
	if (!(typeof unsafeWindow.gApplication == 'undefined'))
		noScrollZoomWait();

}, false);
