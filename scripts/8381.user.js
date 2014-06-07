// Kill CSS Mouse Cursors
// 2007-04-08
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
// select "Kill CSS Mouse Cursors", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Kill CSS Mouse Cursors
// @namespace     http://swanky.de/greasemonkey/
// @description   Overwrites custom CSS Mouse Styles with the default settings. Customizable via Include and Exclude to just apply it at the usual suspects Myspace, Livejournal, Diaryland... but leaving certain sites out.
// @source        http://userscripts.org/scripts/show/8381
// @include       *
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

addGlobalStyle('body {cursor:auto !important;}');
addGlobalStyle('a {cursor:pointer !important;}');