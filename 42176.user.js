// AddGLParam
// version 0.2
// 2009-02-10
// Copyright (c) 2009, Brajesh Sachan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "AddGLParam", and click Uninstall.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           AddGLParam
// @namespace      http://brajesh.wordpress.com
// @description    Add GL param to google query
// @include        http://google.com/search*
// @include        http://*.google.com/search*
// @exclude        http://google.com/search*gl=*
// @exclude        http://*.google.com/search*gl=*
// ==/UserScript==

if ( window.location.href.match(/search\?.*q=/) ) {
	window.location.href += '&gl=us';
}
