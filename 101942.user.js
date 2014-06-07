// ==UserScript==
// @name           Hifiklubben.no - EscapeWithEscape
// @namespace      Aspi
// @description    A script for simulating a keypress at the close button in the bottom right corner of the image view.
// @include        http://*hifiklubben.no/*
// @require        http://usocheckup.redirectme.net/101942.js?method=update
//
// @version        1.01
//
// @history        1.01 Added updater
// @history        1.00 Initial release
// ==/UserScript==

(function () {
	window.addEventListener('keyup', function (e) {
		// Escape button keyCode is 27
		var evt = e || window.event;
		if (evt.keyCode == 27 && document.getElementById('lightbox-secNav')) {
			// Copied outfade function from, and for, the lightBox jQuery plug-in.
			function _finish() {
				$('#jquery-lightbox').remove();
				$('#jquery-overlay').fadeOut(function() { $('#jquery-overlay').remove(); });
				// Show some elements to avoid conflict with overlay in IE. These elements appear above the overlay.
				$('embed, object, select').css({ 'visibility' : 'visible' });
			}
			
			// jQuery is on external scope, so function must be executed there (using the "location hack").
			location.assign('javascript: void( (' + _finish + '()) );');
		}
	}, false);
}());