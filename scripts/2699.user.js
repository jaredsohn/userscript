// Enable Google video
// version 0.2 BETA!
// 2006-01-21
// Copyright (c) 2005, Seb Morin
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
// select "GMailSecure", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Enable Google video
// @description   So that people oustide US could watch google video
// @include       http://video.google.com/videoplay?*
// @exclude	  http://translate.google.com/translate?u=*
// ==/UserScript==

(function() {
    window.location.href = window.location.href.replace(/^http:/, 'http://translate.google.com/translate?u=http:');
})();