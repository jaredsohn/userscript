// Google Video Region Unlocker
// version 0.6
// 2006-02-13
// Copyright (c) 2005, Christoph
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
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Video Region Unlocker
// @description   Circumvents the region lock on Google Video
// @include       http://video.google.com/*video*
// @exclude		  http://translate.google.com/*
// ==/UserScript==

(function(){window.location.href = window.location.href.replace(/^http:/,'http://translate.google.com/translate_c?u=');})();
