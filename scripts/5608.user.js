// eBay Forum Login Check MOD Opera user script
// version 0.1.1
// 2007-01-05
// Copyright (c) 2007, thorbenhauer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// For compatibility questions see:
// http://freenet-homepage.de/hackimag/userscripts/chart.html
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
// @name          eBay Forum Login Check Mod Opera
// @namespace     http://freenet-homepage.de/hackimag/userscripts/
// @description   http://userscripts.org/scripts/show/5608
// @include       http://forums.ebay.de/*thread.jspa?*
// @include       http://forums.ebay.com/*thread.jspa?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () {

const blacklist = new Array(
    
);

var anchor = document.evaluate("//td[@class='ebayWelcome']//b", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if (anchor == null) {
    return;
}
var userID = anchor.innerHTML;
var form = document.evaluate("//form[@name='postform']", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if (form == null) {
    return;
}
form.addEventListener('submit', trapSubmit, false);

function trapSubmit(event) {
    if (checkList(blacklist, userID) >= 0) {
        if (!confirm("Attention! Your logged in as " + userID +
            "! This account is on your blacklist! Do you wish to proceed " +
            "anyway?")) { 
            event.preventDefault();
            window.location.reload();
        }
    }
}

function checkList(list, ID) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == ID) {
            return i;
        }
    }
    return -1;
}

})();
