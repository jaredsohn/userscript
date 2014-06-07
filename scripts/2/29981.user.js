// MQH CSS
// Copyright (c) 2007, Chabacano
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
// select "mqh css", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          mqh new css
// @namespace     http://es.wikipedia.org/wiki/user:Chabacano
// @description   modifies http://mqh.blogia.com/ css to make text bigger and wider
// @include       http://mqh.blogia.com/*
// ==/UserScript==

if (!GM_xmlhttpRequest) {
  alert('Please update Greasemonkey or disable this script!');
  return;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body, div, td, p, li {     font-family:book antiqua;     font-size: 18px; }table  {width: 800;}');
