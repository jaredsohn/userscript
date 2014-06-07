
// CDReadable
// version 0.7 BETA!
// 2005-08-08
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that increases the font size
// on CDRinfo.com.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CDReadable", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CDReadable
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   increase font size on CDRinfo.com
// @include       http://cdrinfo.com/*
// @include       http://*.cdrinfo.com/*
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

    addGlobalStyle(".Small { font-size: small ! important; } .Middle { font-size: medium ! important; }");

})();

//
// ChangeLog
// 2005-07-08 - 0.7 - MAP - added license block
// 2005-04-21 - 0.6 - MAP - linted
// 2005-04-21 - 0.5 - MAP - change @include
// 2005-04-21 - 0.4 - MAP - changed addGlobalStyle to be a normal function
// 2005-04-15 - 0.3 - MAP - changed addGlobalStyle function to check for <head> element
// 2005-04-14 - 0.2 - MAP - changed addGlobalStyle function to use local variables
//
