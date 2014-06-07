// No Suggestions 
// A very simple Greasemonkey script to get rid of those annoying suggestions on Facebook
// 2009-12-22
// Copyright (c) 2009, Doug Hamlin
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
// @name          No Suggestions
// @namespace     http://doughamlin.com/projects/
// @description   A very simple Greasemonkey script to get rid of those annoying suggestions on Facebook
// @include       http://facebook.com/*
// @include       http://www.facebook.com/*
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

var suggestionsBox = document.getElementById('pagelet_pymkbox');
if (suggestionsBox) {
    suggestionsBox.parentNode.removeChild(suggestionsBox);
}

addGlobalStyle('#pagelet_pymkbox { display: none ! important; }');

