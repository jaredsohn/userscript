// PhotobucketImage Relinker user script
// version 0.2
// 2006-11-21
// Copyright (c) 2006, thorbenhauer
// Released under the GPL license
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
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name          Photobucket Image Relinker
// @namespace     BENKLING!!!
// @description   Rewrites Google Image Search links to point straight to the pictures.
// @include       http://s31.photobucket.com/albums/c369/benkling/
//                for Opera (which doesn't understand tld):
// @include       http://images.google.com/images?*
// @include       http://images.google.de/images?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

createLinks();
window.addEventListener("resize", createLinks, true);

function createLinks() {
    var googLinks = document.evaluate('//a[contains(@href, "/?action=view")]' +
        '[contains(@href, "&current=")]', document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        // MOD: links the domain name to the original google link
    var googFonts = document.evaluate('//font[contains(@color, "#000000")]',
        document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var link, gmatch, font;       
    for (var i = 0; i < googLinks.snapshotLength; i++) {
        link = googLinks.snapshotItem(i);
        font = googFonts.snapshotItem(i);
        gmatch = link.href.match( /\/?action=view&current\=(.*?)\&imgrefurl\=/ );
        // MOD: links the domain name to the original google link
        font.innerHTML = "<a href=\"" + link.href + "\">" + font.innerHTML +
            "</a>";
        link.href = decodeURI(gmatch[1]);
    }
}

})(); // function wrapper for Opera

