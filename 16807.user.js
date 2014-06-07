// eBay Completed Items Extractor user script
// version 0.1.1
// 2008-01-26
// Copyright (c) 2008, thorbenhauer
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
// @name          eBay Completed Items Extractor
// @namespace     http://freenet-homepage.de/hackimag/userscripts/
// @description   http://userscripts.org/scripts/show/16807
// @include       http://*search-completed*.ebay.tld/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

GM_registerMenuCommand("Extract", extract);

function extract() {
    var trs = document.evaluate("//tr[contains(@class, 'ebUpper') or " +
        "contains(@class, 'ebLower')]", document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var list = "", upper, lower, bids;
    for (var i = 0; i < trs.snapshotLength; i+=2) {
        upper = trs.snapshotItem(i);
        lower = trs.snapshotItem(i + 1);
        list += document.evaluate(".//td[contains(@class, 'ebcTtl')]//text()",
            upper, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0).data + ",";
        bids = document.evaluate(".//td[contains(@class, 'ebcBid')]//text()",
            lower, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0);
        if (bids != null) {
            list += bids.data + ",";
        } else {
            list += "fixed price,";
        }
        list += document.evaluate(".//td[contains(@class, 'ebcPr')]//text()",
            lower, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0).data + ",";
        list += document.evaluate(".//td[contains(@class, 'ebcShpNew')]" +
            "//text()", lower, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0).data + ",";
        list += document.evaluate(".//td[contains(@class, 'ebcTim')]//text()",
            lower, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0).data;
        list += "<br />" + "\n";
    }
    var frame = document.getElementById("ecieframe");
    if (!frame) {
        frame = document.createElement("div");
        frame.setAttribute("style", "background-color: white; " +
            "position: absolute; top: 0px; left: 0px; width: 100%; " +
            "font-family: Arial,Helvetica,sans-serif; z-index: 10");
        frame.setAttribute("id", "ecieframe");
        document.body.appendChild(frame);
    }
    var content = '<div style="padding: 10px; background-color: #efefff; ' +
        'width: 95%; margin-left: auto; margin-right: auto; ' +
        'margin-top: 10px; margin-bottom: 10px; ' +
        'border: 1px solid rgb(204, 204, 255); font-size: small;">';
    content += '<input type="button" value="close" id="ecieclose" ' +
        'style="font-size: x-small; color: white; ' +
        'border: none; background-color: #0040b2; padding: 1px; ' + 
        'margin: 1px; float: right;" />\n';
    content += '<center style="clear: right"><h1 style="font-weight: ' +
        'bold; font-size: large;">Completed Items Extractor</h1></center>';
    content += '<hr style="background-color: #ffffff; border: 1px solid ' +
        '#ffffff; height:2px;">\n';
    content += '<div>' + list + '</div>';
    content += '</div>';
    frame.innerHTML = content;
    var node = document.getElementById("ecieclose");
    node.addEventListener('click',
        function(event) {
            frame.innerHTML = "";
        }, true);
}

})(); // function wrapper for Opera
