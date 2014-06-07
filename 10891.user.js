// Sathyanarayanan Chandrasekar
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
// select "Irazoo Receiver", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Irazoo Receiver
// @namespace     http://diveintogreasemonkey.org/download/
// @description   example script to alert "Hello world!" on every page
// @include       http://www.irazoo.com/ViewSiteHeader.aspx*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==



box=document.getElementById('textBoxComment');
box.value="Kumaargiri and some greasemonkeygiri";
btn=document.getElementsByName('buttonYes');
btn[0].click();


