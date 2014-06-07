
// Ain't It Readable
// version 0.6 BETA!
// 2005-07-08
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that changes the page style
// of aint-it-cool-news.com.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Ain't It Readable", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ain't It Readable
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   change style on aint-it-cool-news.com
// @include       http://aint-it-cool-news.com/*
// @include       http://*.aint-it-cool-news.com/*
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2005 Mark Pilgrim

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

(function() {
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle(
'h1, h2, h3, h4 {' +
'  font-size: 12px ! important;' +
'  line-height: 14px ! important;' +
'  font-weight: normal ! important;' +
'}' +
'h1:hover, h2:hover, h3:hover, h4:hover {' +
'  background-color: inherit ! important;' +
'  color: inherit ! important;' +
'}');
})();

//
// ChangeLog
// 2005-07-08 - 0.6 - MAP - added license block
// 2005-04-21 - 0.5 - MAP - linted
// 2005-04-21 - 0.4 - MAP - changed addGlobalStyle to a normal function
// 2005-04-15 - 0.3 - MAP - changed addGlobalStyle function to check for <head> element
// 2005-04-14 - 0.2 - MAP - changed addGlobalStyle function to use local variables
//
