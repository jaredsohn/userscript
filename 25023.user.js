// TheMarker TalkBack Stripper
// version 3.0
// 2008-04-08
// Copyright (c) 2008, Ran Yaniv Hartstein
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
// select "TheMarker TalkBack Stripper", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            TheMarker TalkBack Stripper
// @author          Ran Yaniv Hartstein <http://ranh.co.il/>
// @namespace       http://www.brunotorres.net/greasemonkey/
// @description     Removes the talkback section from themarker.com articles
// @include         http://*themarker.com*
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

addGlobalStyle('tr#talkback2 {display: none !important; visibility: hidden !important;}');