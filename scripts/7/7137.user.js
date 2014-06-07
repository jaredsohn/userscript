// eBay Answer Center Post Ref user script
// version 0.1.2
// 2008-02-12
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
// @name          eBay Answer Center Post Ref
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/7137
// @include       http://answercent*.ebay.tld/*thread.jspa?*
// @exclude       http://answercenter.ebay.it/thread.jspa?*
//                for Opera (which doesn't understand tld):
// @include       http://answercenter.ebay.com/*thread.jspa?*
// @include       http://answercenter.ebay.com.au/*thread.jspa?*
// @include       http://answercenter.ebay.ca/*thread.jspa?*
// @include       http://answercenter.ebay.com.hk/*thread.jspa?*
// @include       http://answercenter.ebay.com.my/*thread.jspa?*
// @include       http://answercenter.ebay.com.sg/*thread.jspa?*
// @include       http://answercenter.ebay.pl/*thread.jspa?*
// @include       http://answercentre.ebay.co.uk/*thread.jspa?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

var baseURL = document.location.href.split("thread.jspa?")[0];
var tdList = document.evaluate("//td[@class='jive-subject']", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var messageIDs = document.evaluate("//tr[@class = 'ebayACUserRow' or " +
    "@class = 'ebayACRootUserRow' or @class = 'pinkliner']//a[@name]/@name",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var td, messageID, text;
for (var i = 0; i < tdList.snapshotLength; i++) {
    td = tdList.snapshotItem(i);
    messageID = messageIDs.snapshotItem(i).value;
    text = td.innerHTML;
    td.innerHTML = "<a href=\"" + baseURL +"thread.jspa?messageID=" +
        messageID + "#" + messageID + "\">" + text + "</a>";
}

})(); // function wrapper for Opera