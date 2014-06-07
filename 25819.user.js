// evernote-secure.user.js
//
// Copyright (c) 2008, Jim Lawton
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Evernote Secure", and click Uninstall.
//
// Requires Greasemonkey 0.6.4 and Firefox 1.5 or later.
// Works with Firefox 2.0.
//
// ----------------------------------------------------------------------------
// WHAT IT DOES:
// Forces Evernote to use https instead of http, except for certain parts of 
// the Evernote site (support, help) which do not support https.
// ----------------------------------------------------------------------------
// HISTORY:
//  2008-05-25  0.1   Initial version.
// ----------------------------------------------------------------------------

// ==UserScript==
// @name          Evernote Secure
// @author        Jim Lawton
// @namespace     http://www.userscripts.org/people/171
// @description   Forces Evernote to use secure connection.
// @include       http://evernote.com/*
// @include       http://*.evernote.com/*
// @exclude       http://evernote.com/about/*
// @date          2008-05-01
// @version       0.1
// @GM_version    0.6.6
// ==/UserScript==

location.href = location.href.replace(/^http:/, 'https:');
