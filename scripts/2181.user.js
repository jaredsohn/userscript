// Newsgator Big Fons
// version 0.1
// 2005-11-19
// Copyright (c) 2005, Ran Yaniv Hartstein
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
// select "Newsgator Big Font", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Newsgator Big Font
// @author          Ran Yaniv Hartstein <http://www.trans.co.il/>
// @namespace       http://www.brunotorres.net/greasemonkey/
// @description     Increases fonts on NewsGator
// @include         http://www.newsgator.com/ngs/subscriber/WebEd2*
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

addGlobalStyle('#content * {font-size: 20px !important; line-height: 28px;} #sidebar * {font-size: 18px !important; line-height: 24px;} img[src="../images/fwd_email.gif"] {width: 25px; height: 20px} img[src="../images/save.gif"] {width: 20px; height: 20px} img[src="../images/markRead_Small.gif"] {width: 20px; height: 20px}');