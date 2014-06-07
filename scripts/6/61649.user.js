// Fluidr Preloadr
// version 0.2
// 2009-10-11
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
// select "Fluidr Preloadr", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==

// @name           Fluidr Preloadr
// @namespace      http://www.fluidr.com/
// @description    Preload More Images on Fluidr.com
// @include        http://www.fluidr.com/*
// ==/UserScript==

unsafeWindow.gCurrentSearchParams['per_page'] = 15;
unsafeWindow.gPhotosPerPage = 15;
unsafeWindow.gRequestThreshold = 3000;