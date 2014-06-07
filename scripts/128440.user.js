// Finally Center TCF
// A quick patch to center the TCF Bank's ugly ass website.
// 2012-03-15
// Copyright (c) 20112, Brandon Sullivan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "No Suggestions", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Finally Center TCF
// @namespace     http://elsullivano.com/
// @description   A quick patch to center the TCF Bank's ugly ass website.
// @include       http://www.tcfbank.com/*
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


addGlobalStyle('body table { margin:0 auto; }');
