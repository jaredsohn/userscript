// Ravelry project page tweak
// version 0.2
// 2009-01-20
// Copyright (c) 2009, Tibbi Scott
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ----------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Ravelry project page tweak", and click Uninstall.
//
// ----------------------------------------------------------------------
//
// ==UserScript==
// @name           Ravelry project page tweak
// @namespace      http://userscripts.org/scripts/show/40983
// @description    Move project tab list down a litle
// @include        http://www.ravelry.com/projects/*
// ==/UserScript==
//
// ----------------------------------------------------------------------
//

// changing .panel {width: 960px; margin-top: -1px} to 31px to move tabs out of way of text
// used function from http://diveintogreasemonkey.org/patterns/add-css.html


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.panel {width: 960px; margin-top: 31px}');

