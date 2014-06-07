// ==UserScript==
// @name          Blogspot Image Relinker
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/29891
// @version       0.2
// @date          2009-05-20
// @copyright     2008-2009, thorbenhauer
// @license       GPL 2 or later
// @include       http://*.blogspot.com/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
//
// Inspired by
// ekbworldwide http://userscripts.org/users/39581
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
(function () { // function wrapper for Opera

var picLinks = document.evaluate("//img[contains(@src, '.blogspot.com/')]" + 
  "/ancestor::a[contains(@href, '.blogspot.com/')]", document, null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var link;
for (var i = 0; i < picLinks.snapshotLength; i++) {
  link = picLinks.snapshotItem(i);
  link.href = link.href.replace(/\/s\d+[^\/]*\//, "/s1600/");
}

})(); // function wrapper for Opera