// Fluidr Fade Disable
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
// select "Fluidr Fade Disable", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==

// @name           Fluidr Fade Disable
// @namespace      http://www.fluidr.com/
// @description    Disable the fade effect in Slideshow Mode
// @include        http://www.fluidr.com/*
// ==/UserScript==

unsafeWindow.gFXDimDuration = 0;