// Xanga NoProps
// version 0.0.1 
// 2007-08-26
// Copyright (c) 2007, Sean Fulmer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Xanga NoProps", and click Uninstall.
//
// --------------------------------------------------------------------
// HISTORY
// 20070827 - initial
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Xanga NoProps
// @namespace     http://xanga.noandwhere.com/userscripts
// @description   defaults eprops to comment only
// @include       http://xanga.com*
// @include       http://www.xanga.com*
// ==/UserScript==

function doNoProps() {
    var np = document.getElementById('rblEprops_3');
    if (np) {
        np.click();
    }
}
window.addEventListener('load', doNoProps, false);
