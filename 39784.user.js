// realestate.com.au remove scrolling ads
// version 0.1
// 2009-01-04
// Copyright (c) 2009, Eddy Pronk, Pete Johns
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
// select "realestate.com.au remove scrolling ads", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          realestate.com.au remove scrolling ads
// @namespace
// @description   Remove ads causing excessive CPU usage
// @include       http://www.realestate.com.au/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.sponsor { display: none ! important; }');
