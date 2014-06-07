// Fast Oron 1.0.0
// 2011-02-15
// Copyright (c) 2011, Sky
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
// select "Fast Oron", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Fast Oron
// @namespace     http://oron.com/
// @description   Disable countdown in oron.com
// @include       http://*.oron.com/*/*.html
// ==/UserScript==

$('countdown').innerHTML = 1;