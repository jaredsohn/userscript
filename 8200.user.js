// MySpace Set Image Width User Script
// 2007-03-28
// Copyright (c) 2007, Tom Kropf
// http://userscripts.org/people/23412
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
// select "MySpace Set Image Width", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MySpace Set Image Width
// @namespace     http://swanky.de/greasemonkey/
// @description   Prevents picture comments from breaking the layout on MySpace profiles.
// @source        http://userscripts.org/scripts/show/8200
// @include       http://www.myspace.com/*
// @include       http://myspace.com/*
// @include       http://profile.myspace.com/*
// @version       0.0.1
// ==/UserScript==

// Squirrels are your friends!

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('img {max-width: 300px !important;}');

// 0.0.1	Initial release.