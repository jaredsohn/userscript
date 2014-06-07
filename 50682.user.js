// Remove Facebook Frame user script
// version 0.1 BETA!
// 2009-06-01
// Copyright (c) 2009, Thomas Dippel
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Remove Facebook Frame", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Remove Facebook Frame
// @namespace     http://userscripts.org/users/93185
// @description   Removes the frame that Facebook places around shared pages when clicking the link.
// @include       http://facebook.com/ext/share.php*
// @include       http://*.facebook.com/ext/share.php*
// ==/UserScript==
var iFrame = document.getElementById('content_iframe');
window.location.href = iFrame.src;