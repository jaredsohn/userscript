// Google IG Gmail Compose Text Link script
// version 1.0
// 2005-09-21
// Copyright (c) 2005, Randall Wald
// based on Google Homepage Compose
// by Travis Hume
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
// @name Google IG Gmail Compose Text Link
// @description Adds a compose link to gmail section of Google IG homepage
// @include http://*.google.com/ig
// ==/UserScript==

(function() {
    theBadTd = document.getElementById('gmseesum').parentNode.parentNode.parentNode.parentNode.previousSibling
    newTd = document.createElement('td');
    newFont = document.createElement('font');
    newFont.size = '-1';
    newLink = document.createElement('a');
    newLink.href = 'http://gmail.google.com/gmail?view=cm&fs=1&tearoff=1';
    newLink.target = 'igmail';
    newLink.appendChild(document.createTextNode('Compose'));
    newFont.appendChild(newLink);
    newTd.appendChild(newFont);
    theBadTd.parentNode.replaceChild(newTd, theBadTd);
})();
