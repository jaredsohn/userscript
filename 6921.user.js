// eBay Feedback Extender Enhanced Reloaded user script
// version 0.3
// 2008-02-28
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
// @name          eBay Feedback Extender Enhanced Reloaded
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/6921
// @include       http://feedback*.ebay.tld/ws/eBayISAPI.dll?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------

var tld = document.domain.split(".ebay.")[1];
var be = "";
var regExp = /%\"\s+class=\"titlePadding\"><h1\s+class\=\"itemTitle\">(.*)<\/h1>/;
switch (tld) {
    case "de":
    case "at":
    case "ch":
        regExp1 = 
        viewItem = "Artikel aufrufen";
        loadingMessage = "Auswertung...";
        break;
    case "com":
    case "com.au":
    case "ca":
    case "in":
    case "ie":
    case "com.my":
    case "ph":
    case "com.sg":
    case "co.uk":
        viewItem = "View Item";
        loadingMessage = "Loading...";
        break;
    case "be":
        be = document.domain.split(".ebay.")[0].split("feedback")[1];
    default:
        viewItem = "View Item";
        loadingMessage = "Loading...";
        break;
}

var td, temp, anchor;
tds = document.evaluate("//table[@class='fbOuter']//tr[@class='bot']/" +
    "td[contains(text(), '-- (')]", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (tds.snapshotLength == 0) {
    tds = document.evaluate("//table[@class='FbOuterYukon']//" +
        "tr[@class='bot']/td[contains(text(), '-- (')]", document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
for (var i = 0; i < tds.snapshotLength; i++) {
    td = tds.snapshotItem(i);
    anchor = td.parentNode.lastChild;
    temp = td.innerHTML;
    itemID = temp.match(/(\d+)/)[1];
    anchor.innerHTML = loadingMessage;
    GM_xmlhttpRequest({
        xhRTd: td,
        xhRAnchor: anchor,
        xhRItemID: itemID,
        method: 'GET',
        url: 'http://cgi' + be + '.ebay.' + tld +
            '/ws/eBayISAPI.dll?ViewItem&item=' + itemID,
        onload: function(responseDetails) {
            if (responseDetails.status == 200) {
	            var matches = regExp.exec(responseDetails.responseText);
	            this.xhRTd.innerHTML = matches[1] + ' (#' +
                    this.xhRItemID + ')';
                matches[1] = matches[1].replace(/\"/g, "'");
	            this.xhRAnchor.innerHTML = '<a href="http://cgi' + be +
	                '.ebay.' + tld + '/ws/eBayISAPI.dll?ViewItem&item=' +
	                this.xhRItemID + '" title="' + matches[1] +
	                '">' + viewItem + '</a>';
	            
            } else {
                this.xhRAnchor.innerHTML = "";    
            }
        }
    });
}