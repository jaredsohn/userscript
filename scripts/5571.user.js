// eBay Forum Shrink Pics user script
// version 0.3.4
// 2008-02-26
// Copyright 2006-2008, thorbenhauer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// @name          eBay Forum Shrink Pics
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5571
// @include       http://forums*.ebay.tld/*thread.jspa?*
// @include       http://answercent*.ebay.tld/*.jspa?*
// @include       http://community.ebay.de/forum/ebay/thread.jspa?*
//                for Opera (which doesn't understand tld):
// @include       http://forums.ebay.com/*thread.jspa?*
// @include       http://forums.ebay.com.au/*thread.jspa?*
// @include       http://forums-be*.ebay.be/*thread.jspa?*
// @include       http://forums.ebay.ca/*thread.jspa?*
// @include       http://forums.ebay.fr/*thread.jspa?*
// @include       http://forums.ebay.com.hk/*thread.jspa?*
// @include       http://forums.ebay.in/*thread.jspa?*
// @include       http://forums.ebay.co.uk/*thread.jspa?*
// @include       http://forums.ebay.it/*thread.jspa?*
// @include       http://forums.ebay.com.my/*thread.jspa?*
// @include       http://forums.ebay.nl/*thread.jspa?*
// @include       http://forums.ebay.ph/*thread.jspa?*
// @include       http://forums.ebay.pl/*thread.jspa?*
// @include       http://forums.ebay.com.sg/*thread.jspa?*
// @include       http://forums.ebay.es/*thread.jspa?*
// @include       http://answercenter.ebay.com/*.jspa?*
// @include       http://answercenter.ebay.com.au/*.jspa?*
// @include       http://answercenter.ebay.ca/*.jspa?*
// @include       http://answercenter.ebay.com.hk/*.jspa?*
// @include       http://answercenter.ebay.com.my/*.jspa?*
// @include       http://answercenter.ebay.com.sg/*.jspa?*
// @include       http://answercenter.ebay.pl/*.jspa?*
// @include       http://answercentre.ebay.co.uk/*.jspa?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

var maxwidth = 750;
var imgs = document.evaluate("//div[@id='jive-flatpage']//img", document.body,
    null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (document.domain == 'community.ebay.de') {
    maxwidth = 560;
    imgs = document.evaluate("//img[@class='idm-post-attachment']",
        document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
var img;
window.addEventListener('load', shrink, false); // true doesn't work in Opera

function shrink(event) {
    for(var i = 0; i < imgs.snapshotLength; i++) {
        img = imgs.snapshotItem(i);
        if (document.domain == 'community.ebay.de') {
            img.style.width = "";
        }
        if (img.width > maxwidth) {
            if (img.parentNode.href) {
                img.parentNode.removeAttribute("href");
            }
            img.setAttribute("exwidth", img.width);
            img.width = maxwidth;
            img.title = "Click to enlarge";
            img.style.cursor = "pointer";
            img.addEventListener('click',
                function(event) {
                    switchWidth(event);
                }, false // true doesn't work in Opera
            );
        }
    }
}

function switchWidth(event) {
    var img = event.target;
    if (img.width == maxwidth) {
        img.width = img.getAttribute("exwidth");
        img.title = "Click to shrink";
        if (document.domain == 'community.ebay.de') {
            var parent = document.evaluate("./ancestor::div[@class = " +
                "'idm-posttext']", img, null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
            parent.setAttribute("style", "width: auto !important; " +
                "overflow: scroll;");
        }
    } else {
        img.width = maxwidth;
        img.title = "Click to enlarge";
        if (document.domain == 'community.ebay.de') {
            var parent = document.evaluate("./ancestor::div[@class = " +
                "'idm-posttext']", img, null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
            parent.style.overflow = "";
        }
    }
}

})(); // function wrapper for Opera