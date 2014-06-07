
// Janetizer
// version 0.1 BETA!
// 2006-11-01
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
// select "Ain't It Readable", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Janetizer!
// @description   change style on 85broads.com to Janet's Style
// @include       http://www.85broads.com/*
// @include       http://*.85broads.com/*
// @include       https://secure.85broads.com/*
// @include       https://*.85broads.com/*
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

addGlobalStyle(
'p, div, li {' +
'  font-weight: bold ! important;' +
'}'
);

