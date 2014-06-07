// Trackify
// version 0.1 BETA!
// 2010-11-01
// Copyright (c) 2010, Joel Curtis
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Trackify", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Trackify
// @namespace http://userscripts.org/users/126398
// @description Uses trackify by default.
// @include       http://open.spotify.com/track/*
// ==/UserScript==

(function() {
var Trackify = function() 
{
	var url = location.href;
	
	if (url.charAt(url.length - 1) == "/") 
	{
 		url = url.substring(0, url.length - 1);
	}

	url = url.replace("http://open.spotify.com/track/", "");
	url  = "http://trackify.info/track:"+url;
	window.location.href = url;
}
	window.addEventListener("load",Trackify, false);
})();