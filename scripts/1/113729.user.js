// FB Redirect
// Version 1.2
// Sept 27, 2011
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
// select "FB Redirect", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FB Redirect
// @namespace     Lone Hood
// @description   Deletes all list items above "Recent Stories"
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// @require       http://sizzlemctwizzle.com/updater.php?id=113729
// @require       http://code.jquery.com/jquery-1.6.2.min.js
// ==/UserScript==

// Scroll past "Top Stories" down to "Recent Stories"
$(document).ready(function() {
   $('li#highlight_header div.clearfix span.uiStreamHeaderText a.uiIconText').trigger('click');
});

// Deletes all list items above "Recent Stories"
$('li#recent_header').prevAll().remove();


