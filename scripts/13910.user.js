// GmailFormattedTitle
// version 0.2
// 2007-11-16
// Copyright (c) 2007, dsjkvf

// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// --------------------------------------------------------------------
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Reader Quick Links", and click Uninstall.
// --------------------------------------------------------------------

// The following scripts were used:
// Google Inbox Count Display: http://userscripts.org/scripts/show/4146
// Google Inbox Count Display 2: http://userscripts.org/scripts/review/13881
// Older Version Gmail Title: http://userscripts.org/scripts/show/13718
// All credits go to their authors

// Changelog:
// 0.1
// scripts merged, initial version
// 0.2
// empty Inbox (and probably other labels) view fixed

// ==UserScript==
// @name  Gmail Formatted Title
// @namespace  http://userscripts.org/users/2875/scripts
// @description  Modifies Gmail inbox's title in order to display the count of unread messages at the beginning
// @include  http://mail.google.com/*
// @include  https://mail.google.com/*
// ==/UserScript==

unsafeWindow.document.watch('title', function(prop, oldval, newval) {
// remove 'email@gmail.com'
var lstI = newval.lastIndexOf(" - ");
if(lstI != -1){
	newval = newval.substring(0,lstI);
}
if (matches = newval.match(/\((\d+)\)/)) {
	// remove the old unread count
	newval = newval.replace(/\(.*\)/, "");
	// add the unread count to the beginning
	newval = newval.replace(/^/, + matches[1] + " unread - ");
}
// change 'Gmail - ' to 'Google Mail - '
newval = newval.replace(/Gmail - /, "Google Mail - ");

return newval;
});
