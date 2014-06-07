//
// Copyright (c) 2005, Vlajbert
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Salon Premium Pass", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Salon Premium Pass
// @namespace     http://vlajbert.blogspot.com/
// @description   Allows you to visit Salon without having to view the prem-pass ad.
// @include       http://www.salon.com/*
// @include       http://salon.com/*
// @version       0.0.8
// ==/UserScript==

(function() {
	if( ! document.cookie.match( 'SALON_PREMIUM') && ! document.location.search.match( 'acquire$')) {
		var req = new XMLHttpRequest();
		req.open( "GET", 'http://www.salon.com/news/cookie756.html', false);
		req.send( null);
		document.location = document.location + ((document.location.search)?'&':'?') + 'acquire';
	}
	if( document.cookie.match( 'SALON_PREMIUM') && document.location.pathname.match( '^/src/pass/gateway/')) {
		var url = document.location.search.substr( 1);
		document.location = url.replace( /&acquire/, '?acquire');
	}
})();

// 0.0.1	Initial release.
// 0.0.2	Change the 'premium' cookie being sent.
// 0.0.3	Added the test for not_premium in the cookie.
// 0.0.4	Fixed the comment about uninstalling. It was pointing to Mark Pilgrim's Salon Auto-Pass, Thanks Alec.
// 0.0.5	Ok, I'm taking a new angle with this. I'm following their click path. Spoofing cookies is a pain. :)
// 0.0.6	Here's todays version. :)
// 0.0.7	Ok, another new angle. Test for the cookie, if it doesn't exist pull the cookie dropping page then reload.
// 0.0.8	Added a hook for /src/pass/gateway/ interstitial.