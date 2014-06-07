// FB Widescreen
// Version 1.1
// Sept 29, 2011
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
// select "FB Widescreen", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FB Widescreen
// @namespace     Lone Hood
// @description   Widens your facebook newsfeed
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// @exclude       http://www.facebook.com/photo.php*
// @exclude       https://www.facebook.com/photo.php*
// @require       http://sizzlemctwizzle.com/updater.php?id=114089
// @require       http://code.jquery.com/jquery-1.6.2.min.js
// ==/UserScript==


// Make use of your wide screen
$('div#globalContainer').css('width','auto');
$('div#globalContainer').css('padding-left','15px');
$('div#globalContainer').css('padding-right','15px');

$('div#contentArea').css('width','100%');
$('div#contentArea').css('width','-=275');
$('div#contentArea').css('padding-right','5px');


$('body').live('Event mousemove', function() {
  $('ul.uiList').css('width','auto');
});

$('div#pagelet_current').trigger("Event");

// Remove ads so they can be replaced by chat box contents
$('div#pagelet_ego_pane').remove();



