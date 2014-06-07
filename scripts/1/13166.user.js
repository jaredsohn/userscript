// Make Lexology Readable
// version 0.1
// 2007-10-21
// Copyright (c) 2007, Kuan Hon
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a free Greasemonkey user script.  To install it, you need -
// (1) the free Firefox browser: http://getfirefox.com/ and
// (2) the free Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
//
// Click the "Install Greasemonkey" link.
// If you see "To protect your computer, Firefox prevented this site 
// (greasemonkey.mozdev.org) from installing software on your computer"
// click "Edit Options", "Allow", "OK", "Close".
// Click the "Install Greasemonkey" link again, then "Install now".
// Then restart Firefox and click the link to this script again.
// Click Install, waiting a few seconds first if necessary.
//
// Under Tools, there will be a new menu item "Greasemonkey".
//
// To uninstall, go to Tools/Greasemonkey/Manage User Scripts,
// select "Make Lexology Readable", and click Uninstall, and OK.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Make Lexology Readable
// @namespace     http://www.quanmusic.com/
// @description   Make default Lexology.com font darker and bigger
// @include       http://*.lexology.com/*
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
'p {' +
'  font-size: 1em ! important;' +
'  line-height: 1.5em ! important;' +
'  font-weight: normal ! important;' +
'  color: #000000 ! important;' +
'}' +
'h1, h2, h3, h4, h1 a, h2 a, h3 a, h4 a {' +
'  color: #000000 ! important;' +
'}' +
'li, li a, label {' +
'  color: #000000 ! important;' +
'}' +
' a:link {' +
' text-decoration: underline ! important;' +
'}' +
' a:visited {color: #58585a ! important;' +
'}');
