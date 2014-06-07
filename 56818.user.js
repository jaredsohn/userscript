// Google Analytics Scrolling Menu
// version 0.1 BETA!
// 2009-09-01
// Copyright (c) 2009, New Media Gateway
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
// @name           Google Analytics Scrolling Menu
// @namespace      tysonkirksey.com
// @description    Left-hand menu will move down the page
// @include        http://www.google.com/analytics/*
// @include        https://www.google.com/analytics/*
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

addGlobalStyle('#main_context { position: fixed; top: 85px;}');