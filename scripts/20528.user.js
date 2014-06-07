// Everything2 delinkerator
// version 0.2
// 2008-01-17
// Copyright (c) 2008, Gabriel Getzie
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//-----------------------------------------
//
// This is a Greasemonkey user script.
//
// To install you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script.
// Accept the default configuration and install.
// This script has only been tested with Greasemonkey 0.3 or later.
//
//----------------------------------------
//
// ==UserScript==
// @name Everything2 delinkerator
// @namespace tag;ggetzie@gmail.com,2008-01-17:e2dl
// @description Remove underlines from links on everything2.com
// @include http://everything2.com/*

function addGlobalStyle(css) {

// addGlobalStyle function courtesy of Mark Pilgrim's
// Dive Into Greasemonkey
// http://diveintogreasemonkey.org

    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle("a { text-decoration: none; }");