// Bungie.net Header Change
// version 1.1
// c r e a t e d   b y   the eNeME
// Redone by Duardo
// 6/10/2009
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Bungie.net Header Fix", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Bungie.net Header Change
// @namespace     http://www.bungie.net/Forums/posts.aspx?postID=27428424
// @description    Replaces the blue background image for the Bungie.net header to one that matches the current theme, a burnt red.
// @include        *.bungie.net/*
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

addGlobalStyle('div.sContent-head {width: 100%; float: left; background: #000 url(http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/bnet_header1-1.jpg); background-position: top center; background-repeat: no-repeat;}');
addGlobalStyle('div.sContentpopup {width: 100%; float: left; background: #000 url(/images/base_struct_images/themes/default/brandnav_bg1px2.jpg) repeat-x;}');