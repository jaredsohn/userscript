// ==UserScript==
// @name           Prevent Location popup on eBay
// @description    eBay keeps bugging to provide country and postal code (disabled for some countries). Lets fix this bug for them
// @include        http://*.ebay.tld/*
// ==/UserScript==

/* Author: Domen Puncer <domen@cba.si>
 * License: Public Domain
 */

/* YES, I'm aware this is ugly, but I do not know how do to it differently,
   even if I hook up to "load", it's still too early */

window.setInterval(
	function() {
		var popup = document.getElementById('_LOC_POP_OVLY');
		if (popup)
			popup.parentNode.removeChild(popup);
	},
	500);
