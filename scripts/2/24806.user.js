// 84monkifox (Anonymous browsing with bypassfox.com)
// 2008-04-06
// Public Domain
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
// select "84monkifox", and click Uninstall.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name           84monkifox
// @namespace      something
// @description    bypass "The 84" blocking using bypassfox.com
// @include        http://rapidshare.com/*
// @include        http://rapidshare.de/*
// @include        http://*rapidshare.com/*
// @include        http://*rapidshare.de/*
// @include        http://*multiply.com/*
// @include        http://*youtube.com/*
// @include        http://*myspace.com/*
// @include        http://*metacafe.com/*
// @include        http://*facebook.com/*
// @exclude        http://bypassfox.com/*
// ==/UserScript==

(function() {
	window.location.href = 'http://bypassfox.com/browse.php?u=%3A%2F%2F' + window.location.hostname + '&b=14';
})();