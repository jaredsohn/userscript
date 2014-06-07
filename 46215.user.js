// Facebook destroyer
// version 0.1 BETA!
// 2009-04-08
// Cornelius Archenon
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Facebook Destroyer
// @namespace     http://diveintogreasemonkey.org/download/
// @description   so that you stop facebooking
// @include       http://www.facebook.com/*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==

document.getElementById("home_sidebar").innerHTML = "oops";
document.getElementById("home_left_column").innerHTML = "oops";
document.getElementById("content").innerHTML = "oops";
document.getElementById("presence").innerHTML = "oops";
document.getElementById("dropmenu_container").innerHTML = "oops";
document.getElementById("nonfooter").innerHTML = "oops";
document.getElementById("pagefooter").innerHTML = "oops";
document.getElementById("tab_content").innerHTML = "oops";
document.getElementById("menubar_container").innerHTML = "oops";
document.getElementById("page_height").innerHTML = "oops";
document.getElementById("js_buffer").innerHTML = "oops";
