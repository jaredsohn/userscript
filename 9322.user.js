// Use Google Experimental Shortcuts
// Written by Benjamin Moreno
// Last updated May 17, 2007
//
// Copyright (c) 2007, Benjamin Moreno
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// 
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
// select "Use Google Experimental Shortcuts", and click Uninstall.
//
// --------------------------------------------------------------------
// 
// 
// ==UserScript==
// @name          Use Google Experimental Shortcuts 
// @author        Benjamin Moreno
// @description   Redirects normal Google searches to use the experimental version of Google Search with keyboard shortcuts
// @include       http://google.com/search*
// @include       http://*.google.com/search*
// @exclude       http://google.com/search*esrch*
// @exclude       http://*.google.com/search*esrch*
// ==/UserScript==

if ( window.location.href.match(/search\?.*q=/) )
{
	window.location.href += '&esrch=BetaShortcuts';
}
