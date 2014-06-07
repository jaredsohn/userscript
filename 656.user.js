
// Blogdex Display Title
// version 0.6 BETA!
// 2005-07-08
// 
// --------------------------------------------------------------------
//
//
// This is a Greasemonkey user script that displays link text inline
// on blogdex.net.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Blogdex Display Title", and click Uninstall.
//
// ==UserScript==
// @name            Blogdex Display Title
// @namespace       http://diveintomark.org/projects/greasemonkey/
// @description     Display Blogdex link text inline
// @include         http://blogdex.net/*
// @include         http://www.blogdex.net/*
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
    var a, elm, i, title;
    a = document.evaluate(
        "//div[@class='detail']//a[@title]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (i = 0; i < a.snapshotLength; i += 1) {
        elm = a.snapshotItem(i);
        title = document.createElement('div');
        title.style.marginLeft = "1em";
        title.style.paddingLeft = "1em";
        title.style.width = "40em";
        title.style.backgroundColor = "white";
        title.style.color = "#555";
        title.style.borderLeft = "4px double silver";
        title.appendChild(document.createTextNode(
            ' [' + elm.getAttribute('title') + ']'));
        elm.parentNode.insertBefore(title, elm.nextSibling);
    }
})();

//
// ChangeLog
// 2005-07-08 - 0.6 - MAP - added license block
// 2005-05-16 - 0.5 - MAP - fixed loop
// 2005-04-21 - 0.4 - MAP - linted
// 2005-04-18 - 0.3 - MAP - tidy code
//
