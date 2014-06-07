// Fix 1&1s Stupid Webmail
// version 0.1 BETA!
// 2009-05-07
// Copyright (c) 2009, Matt Andrews
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Fix 1&1 Webmail
// @namespace     http://www.threechords.org
// @description   Overrides a broken CSS class on 1&1's webmail, since they're too lazy to apply this fix themselves (which I emailed them)
// @include       *.1and1.co.uk
// @include		  https://email.1and1.co.uk/*
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


window.addEventListener(
    'load', 
    function() { addGlobalStyle('.fakeButton { line-height: 0 !important; }');
	},
    true);