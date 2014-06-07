// Wunderlist Fixer
// Version 1.0
// 2011-03-11
// Copyright (c) 2011, Peter Kraml
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// With thanks to the Hello, World! Tutorial at http://diveintogreasemonkey.org/helloworld/divein.html
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
// select "Wunderlist Fixer", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Wunderlist Fixer
// @namespace     http://www.macpietsapps.net/wunderlistfixer
// @description   moves the sidebar to the correct i.e. right side of the webpage
// @include       http://www.wunderlist.com/home
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

addGlobalStyle('#sidebar {left: -10px !important;} #content {left: 259px !important; right: 0px !important;} #lists {left: 0px !important;}');