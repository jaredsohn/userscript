// YouTube Classic Search
// Version 1.0
// 2008-03-12
// License: GPL
//
// Credits:
// Original Script: thorbenhauer
// Modifications: MaTrIx
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
// @name          YouTube Classic Search
// @namespace     http://userscripts.org/scripts/show/23824
// @description   Restores classic YouTube searching behavior.
// @include       http://*youtube.com/results?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera
var parent = document.evaluate("//td[@class='search-sort']/"+
    "span[@class='sort-by']", document.body, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if (!parent) {
    return;
}
var span = document.createElement("span");
span.setAttribute("class", "separator");
span.innerHTML = "| ";
parent.appendChild(span);
var link;
if (window.location.href.indexOf("search_sort=video_view_count") > -1) {
    link =  document.createElement("span");
    link.setAttribute("class", "sort-by-selected");
} else {
    link =  document.createElement("a");
    if (window.location.href.indexOf("search_sort") < 0) {
        link.href = window.location.href + "&search_sort=video_view_count";
    } else {
        var splits = window.location.href.split("search_sort=");
        var href = splits[0] + "search_sort=video_view_count";
        var index = splits[1].indexOf("&");
        if (index > -1) {
            href += splits[1].substr(index);
        }
        link.href = href;
    }
}
link.innerHTML = "Views";
parent.appendChild(link);
})(); // function wrapper for Opera
(function () { // function wrapper for Opera

var parent = document.evaluate("//td[@class='search-sort']/"+
    "span[@class='sort-by']", document.body, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if (!parent) {
    return;
}
var span = document.createElement("span");
span.setAttribute("class", "separator");
span.innerHTML = "| ";
parent.appendChild(span);
var link;
if (window.location.href.indexOf("search_sort=video_avg_rating") > -1) {
    link =  document.createElement("span");
    link.setAttribute("class", "sort-by-selected");
} else {
    link =  document.createElement("a");
    if (window.location.href.indexOf("search_sort") < 0) {
        link.href = window.location.href + "&search_sort=video_avg_rating";
    } else {
        var splits = window.location.href.split("search_sort=");
        var href = splits[0] + "search_sort=video_avg_rating";
        var index = splits[1].indexOf("&");
        if (index > -1) {
            href += splits[1].substr(index);
        }
        link.href = href;
    }
}
link.innerHTML = "Rating";
parent.appendChild(link);
})(); // function wrapper for Opera