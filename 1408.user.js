
// RottenReviews
// version 0.4 BETA!
// 2005-07-08
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that changes the default
// viewing options on RottenTomatoes.com to display all reviews
// instead of a subset.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "RottenReviews", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          RottenReviews
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   default to viewing all reviews on Rotten Tomatoes.com
// @include       http://rottentomatoes.com/*
// @include       http://www.rottentomatoes.com/*
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
    var links, a, i;
    links = document.evaluate(
        "//a[contains(@href, '/m/')]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (i = 0; i < links.snapshotLength; i += 1) {
        a = links.snapshotItem(i);
        if (/\/m\/.*?\/$/.test(a.href)) {
            a.href += '?page=all';
        }
    }
})();

//
// ChangeLog
// 2005-07-08 - 0.4 - MAP - added license block
// 2005-04-21 - 0.3 - MAP - linted
// 2005-04-18 - 0.2 - MAP - tidy code
//
