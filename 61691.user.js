// Fluidr Custom Keyboard Shortcuts
// version 0.1
// 2009-11-11
// Copyright (c) 2009, Sergiu Bacioiu
// http://www.flickr.com/sergiu_bacioiu
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Fluidr Custom Keyboard Shortcuts", and click Uninstall.
//
// --------------------------------------------------------------------
//
//
// Custom keyboard shortcuts:
//
// Down Arrow 	- Move forward through the stream
// Right Arrow 	- Move forward through the stream
// Up Arrow  	- Move backwards through the stream
// Left Arrow 	- Move backwards through the stream
// S		- Starts a Slideshow ( Picture will change every 3 seconds )
// X		- Stop Slideshow
//
//
// For features updates follow me on twitter.
// http://twitter.com/sergiu_bacioiu
//
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           Fluidr Custom Keyboard Shortcuts
// @namespace      http://www.fluidr.com/
// @description    Custom keyboard shortcuts for Fluidr
// @include        http://www.fluidr.com/*
// ==/UserScript==

function onKeyEvent(a){
	if (a.keyCode == 38 || a.keyCode == 37){
  		unsafeWindow.navigatePhotos(-1);
  		unsafeWindow.Event.stop(a);
  	}
	if (a.keyCode == 40 || a.keyCode == 39){
		unsafeWindow.navigatePhotos(1);
		unsafeWindow.Event.stop(a);
  	}
	if (a.keyCode == 83){
		intervalID = setInterval('navigatePhotos(1)', 3000);
	}
	if (a.keyCode == 88){
		clearInterval(intervalID);
	}
}

unsafeWindow.document.onkeydown = onKeyEvent;