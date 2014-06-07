// DarkAboutHome
// Version 1.0.1
// Sept 10, 2011
// Copyright (c) 2011 USA, Lone Hood (TM)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install
//
// To uninstall, go to Tools/Manage User Scripts,
// select "DarkAboutHome", and click Uninstall.
//
// --------------------------------------------------------------------
//
// You must set aboutIsGreaseable to true
//
// To do so go to About:Config
//
// It may give you a warning that you are about to break the warranty
// This is normal, you may proceed.  Click the I'll be careful button.
//
// In the Filter box type in the phrase aboutIsGreaseable
// then double-click it to set its value to true.
// It will appear bold as well.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          DarkAboutHome
// @namespace     Lone Hood
// @description   Dark About:Home page
// @include       about:home
// @require       http://sizzlemctwizzle.com/updater.php?id=111216
// @require       http://code.jquery.com/jquery-1.6.2.min.js

// ==/UserScript==

// Dim background
$('html').css('background','#000000');

// When you click Google logo it takes you to Google.com
$('div#searchLogoContainer').wrapInner('<a href="http://www.google.com"></a>');

// When you click Firefox logo it takes you to Firefox site
$('div#brandStart').wrapInner('<a href="http://www.mozilla.org/firefox/"></a>');


