/*  AnchorFix v1.0 - Greasemonkey script to fix anchor links
    Copyright (C) 2009 Thomas Stewart <thomas@stewarts.org.uk>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

Inspired in 2004, Created on 31/08/2009, Last Changed 31/08/2009

This is a Greasemonkey user script, see http://www.greasespot.net/ and
http://userscripts.org/

This script searches for links that have anchors and adds an anchor icon
that links to that anchor. Usecase: sending url to someone without having
to scroll to the top to find anchor link or worse reading the html source
and hand editing url adding anchor.

It also searches for links that link to an anchor on the current page and
signifies this by adding an anchor icon after the link text. Usecase: 
reading a page with a menu system at the top some links are off site and
some are anchors to the current page. After reading the whole page which
links are worth clicking, the anchor indicates this.
*/

// ==UserScript==
// @name          AnchorFix
// @namespace     http://www.stewarts.org.uk/tomsweb/AnchorFix
// @description	  fix anchor links
// @include       http://*
// ==/UserScript==

var links = document.evaluate(
        "//a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0; i < links.snapshotLength; i++) {
        // need to test links.snapshotItem(i).href matches document.location too
        // ie hrefs upto # match
        if( links.snapshotItem(i).hash.length > 0 ) {
                links.snapshotItem(i).appendChild(
                        document.createTextNode( "\u2693" ) );
        }
}

var links = document.evaluate(
        "//a[@name]",
        document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0; i < links.snapshotLength; i++) {
        var container = document.createElement('a');
        container.href = '#' + links.snapshotItem(i).name;
        container.appendChild( document.createTextNode( "\u2693" ) );

        links.snapshotItem(i).parentNode.insertBefore(
                container, links.snapshotItem(i).nextSibling);
}
