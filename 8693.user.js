// TV Links Scrollbar Remover
// version 1
// 2007-04-21
// Copyleft (c) 2007, Israel Levin
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
// select "TV Links Scrollbar Remover", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TV Links Scrollbar Remover
// @description   Hides those annoying scrollbars in TV Links 
// @include       http://www.tv-links.co.uk/link.do/*
// ==/UserScript==
document.body.style.overflow = "hidden";
