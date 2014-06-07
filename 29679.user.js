//
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
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          IMDB
// @author        Phineas
// @version       0.1
// @namespace     http://userscripts.org/scripts/show/29679
// @description   Removes the video ads.
// @include       http://www.imdb.com/*preroll*
// ==/UserScript==

(function() 
{
	// Redirect to actual video.
        var str = document.URL;
	var endpos = str.indexOf("preroll");
	var fragment = str.substring(0,endpos);
	fragment = fragment + "player";
	
	window.location.replace(fragment);
	return;
})();

// 0.1		Initial release.
