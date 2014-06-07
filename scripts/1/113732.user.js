// FB Ticker Restricter
// Version 1.3
// Sept 24, 2011
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
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "FB Ticker Restricter", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FB Ticker Restricter
// @namespace     Lone Hood
// @description   removes facebook ticker from the right side
// @include       *facebook*
// @require       http://sizzlemctwizzle.com/updater.php?id=113732
// @require       http://code.jquery.com/jquery-1.6.2.min.js
// ==/UserScript==

// removes facebook ticker from the right side

$('body').live('Event mousemove', function() {
  $('div#pagelet_rhc_ticker').fadeOut(800);
});

$("div#pagelet_current").trigger("Event");


