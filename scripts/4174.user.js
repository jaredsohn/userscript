// Facebook Alert Emphasis
// version 1.1
// 06/12/06
// Copyright (c) 2006, Jake Lazaroff
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
// select "Facebook Alert Emphasis", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Facebook Alert Emphasis
// @description   makes Facebook "alerts" stand out more
// @include       *.facebook.com/home.php*
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

addGlobalStyle('#freq h2 { font-size: 14pt; color: #EE0000; }');
addGlobalStyle('#lreq h2 { font-size: 14pt; color: #EE0000; }');
addGlobalStyle('#newmess h2 {font-size: 14pt; color: #EE0000; }');
addGlobalStyle('#poked h2 {font-size: 14pt; color: #EE0000; }');
addGlobalStyle('#bday h2 { font-size: 14pt; color: #EE0000; }');
