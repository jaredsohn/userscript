// Gunquote
// version 0.2
// 2008-06-11
// Copyright (c) 2008 Lars Torben Wilson
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
// select "Gunquote", and click Uninstall.
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Gunquote
// @namespace      tag:ltwstuff,2008-06-11,Gunquote
// @include        https://mail.google.tld/mail/*
// @include        http://mail.google.tld/mail/*
// @include        https://mail.google.tld/a/*
// @include        http://mail.google.tld/a/*
// @description    Removes the "Show quoted text" in Gmail, showing the actual text instead.
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

addGlobalStyle('\
.gmail_quote div { visibility: visible ! important; display: block ! important; } \
.gmail_quote .Ih2E3d { visibility: visible ! important; display: block ! important; } \
.ArwC7c.ckChnd>div>div { visibility: visible ! important; display: block ! important; } \
.WQ9l9c, .ArwC7c.ckChnd>div>div>span { visibility: hidden ! important; display: none ! important; } 
.ea { visibility: hidden ! important; display: none ! important; } \
.e { visibility: visible ! important; display: block ! important; } \
');
