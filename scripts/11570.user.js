// Safecom ADSL Router CSS Fix
// version 0.1
// 2007-08-19
// Copyright (c) 2007, Dan Wilkinson
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
// select "Safecom ADSL Router CSS Fix", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Safecom ADSL Router CSS Fix
// @namespace     http://www.s2mg.co.uk
// @description   Fixes the CSS in the navigation frame
// @include       http://*/doc/toc.htm
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

addGlobalStyle('body {font-size:11px; font-family:tahoma, arial, sans-serif; line-height:1.2em; margin-left:12px} a:link {text-decoration:none; color: #ffffff} a {text-decoration:none; color: #ffffff} a:visted {text-decoration:none; color: #ffffff} a:hover {text-decoration:underline; color:#FF9B36} b {line-height: 2.2em}');
