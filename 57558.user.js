// GCal Hosted Redirect
// version 0.2.1
// 2010-11-03
// Copyright (c) 2010, Mark Simonds
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "GCal Hosted Redirect", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GCal Hosted Redirect
// @namespace     http://marksimonds.net/greasemonkey/
// @description   force GMail to use secure connection
// @include       http://*.google.com/calendar/*/render?*
// @include       https://*.google.com/calendar/*/render?*
// ==/UserScript==

var domain = "example.com";
if (window.location.pathname.indexOf('/hosted/') == -1) {
	window.location.href = window.location.href.replace('/event', '/hosted/' + domain + '/event');
	window.location.href = window.location.href.replace('/b/0', '/hosted/' + domain);
}


//
// ChangeLog
// 
// v0.2: Added new GCal URL structure ("/b/0").
//
// v0.2.1: Added support for https protocol.
