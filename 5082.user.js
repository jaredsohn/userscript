// yahoo Image Relinker user script
// version 0.1.7
// 2008-02-08
// Copyright 2006-2008, thorbenhauer// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// Based on Google Image Relinker user script by Patrick Cavit
// Homepage: http://patcavit.com/
// Script location: http://userscripts.org/scripts/show/792 
//
// Copyright Notice by Patrick Cavit, pcavit@gmail.com:
// Copy, use, modify, spread as you see fit. Massive thanks go out to
// Eric Hamiter, this code is just a quick modification of his extension at
// http://roachfiend.com/
//
// With MODifications by FurYy
// http://userscripts.org/people/1618
// 
// Also thanks to Nimit Maru (http://nimit.maru.us) for the improvements! 
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
// @name          yahoo Image Relinker
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5082
// @include       http://*images.search.yahoo.com/search/images*
// @include       http://*.search.yahoo.com/search/images*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

var yahooLinks = document.evaluate('//a[contains(@href, "imgurl=")]' +
    '[contains(@href, "rurl=")]', document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
// MOD: links the domain name to the original yahoo link
var yahooAddr = document.evaluate('//address', document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var link, ymatch, addr;       
for (var i = 0; i < yahooLinks.snapshotLength; i++) {
    link = yahooLinks.snapshotItem(i);
    addr = yahooAddr.snapshotItem(i);
    ymatch = link.href.match( /imgurl\=(.*?)(&|%26)?rurl\=/ );
    // MOD: links the domain name to the original yahoo link
    addr.innerHTML = "<a href=\"" + link.href + "\">" + addr.innerHTML +
        "</a>";
    link.href = "http://" + decodeURIComponent(decodeURIComponent(ymatch[1]));
}

})(); // function wrapper for Opera