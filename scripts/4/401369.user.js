// ==UserScript==
// @name        Real Estate FX
// @namespace   http://userscripts.org/users/2460
// @description Adds an old-timey car alarm sound to Redfin listings in SF
// @include     http://www.redfin.com/CA/San-Francisco/*
// @version     1
// @grant       none
// ==/UserScript==

// Wait until the page loads.
window.addEventListener ("load", Greasemonkey_main, false);
function Greasemonkey_main () {
	// Grab the sidebar.
	var sidebar = document.getElementsByClassName( 'col4' );
		
	if (typeof sidebar != 'undefined' && sidebar.length > 0) {
		// If the sidebar's available, stick in our YouTube video.
		var videoContainer = document.createElement('div');
		videoContainer.innerHTML = '<iframe width="300" height="225" src="http://www.youtube.com/embed/GszAfiorVSE?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>';
		sidebar[0].insertBefore(videoContainer, sidebar[0].firstChild);
	}

}
