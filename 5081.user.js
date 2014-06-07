// Google Accesskeys Mod user script
// version 0.1.7
// 2008-04-11
// Copyright 2006-2008, thorbenhauer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// Based on Google Accesskeys user script by Phil Wilson
// Homepage: http://philwilson.org/
// Script location: http://userscripts.org/scripts/show/805 
//
// Copyright Notice:
// Add accesskeys for navigating through Google search results pages
// (c) Phil Wilson, greasemonkey@philwilson.org
//
// GPL.
//
// -----------------------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Accesskeys Mod
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5081
// @include       http://www.google.tld/search?*
// @include       http://images.google.tld/images?*
//                for Opera (which doesn't understand tld):
// @include       http://www.google.com/search?*
// @include       http://images.google.com/images?*
// @include       http://www.google.de/search?*
// @include       http://images.google.de/images?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

var googleNavs = document.evaluate("//td[@class='b']", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
var current = document.evaluate("//img[contains(@src,'/nav_current.gif')]|" + 
    "//div[@id='nc']",
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);
if (current == null) {
    return;
}
var prevNode = current.parentNode.previousSibling.firstChild;
if (prevNode.hasAttribute("href")) {
    prevNode.setAttribute("accesskey", "y");
    var googlePrevious = googleNavs.snapshotItem(0);
    googlePrevious.appendChild(document.createTextNode(" (y)"));
}
var nextNode = current.parentNode.nextSibling.firstChild;
if (nextNode.hasAttribute("href")) {
    nextNode.setAttribute("accesskey", "x");
    var googleNext = googleNavs.snapshotItem(1);
    googleNext.appendChild(document.createTextNode(" (x)"));
} 

})(); // function wrapper for Opera