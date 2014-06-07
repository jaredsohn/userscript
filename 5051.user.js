// eBay Forum Force Wrap user script
// version 0.2.2
// 2008-02-08
// Copyright 2006-2008, thorbenhauer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// Based on Force Wrap user script by LouCypher
// Homepage: http://loucypher.wordpress.com/
// Script location: http://userscripts.org/scripts/show/1847
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
// @name          eBay Forum Force Wrap
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5051
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

function F(node) {
    var index, newNode, next, i;
    if(node.nodeType == 3) {
        index = node.data.search(/\S{80}/);
        if (index >= 0) {
            newNode = node.splitText(index + 80);
            node.parentNode.insertBefore(document.createElement('br'), newNode);
        }
    } else if (node.tagName != 'STYLE' && node.tagName != 'SCRIPT' &&
        node.tagName != 'PRE') {
        for (i = 0; next = node.childNodes[i]; ++i) {
            F(next);
        }
    }
}

F(document.body);
document.body.parentNode.insertBefore(document.body, document.body);

})(); // function wrapper for Opera