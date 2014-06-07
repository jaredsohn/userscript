// Auto Reload
// version 0.1
// 2005-04-06
// Copyright (c) 2005, Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// You should configure the Included and Excluded pages in the GreaseMonkey 
//      configuration pane.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Auto Reload", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//  Reload the pages configured in the Included page list every minute.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Auto Reload
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     "Included pages" will get reloaded every minute.
// @include         http://put.your.own.pages/*/here
// ==/UserScript==

(function()
{
    setTimeout("document.location.reload();", 60000);
})();
