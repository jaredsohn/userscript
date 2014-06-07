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
// select "Trouw.nl - uitschakelen bewegend menu", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Trouw.nl - uitschakelen bewegend menu
// @namespace     http://2of4.net/mozilla/greasemonkey/userscripts/trouw.nl/navigatiemenu/
// @description	  Schakelt de automatische beweging van het navigatiemenu uit
// @include       http://*.trouw.nl/*
// ==/UserScript==

(function(){
	window.stayTopLeft = null;
})();