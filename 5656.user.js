// eBay Forum Quote user script
// version 0.1.10
// 2008-02-08
// Copyright 2006-2008, thorbenhauer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// Icon: Humility Icon Set
// by Andrew Fitzsimon and Chad 'gonZo' Rodrigue
// http://art.gnome.org/themes/icon/1136
// Released under the GPL license
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
// @name          eBay Forum Quote
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5656
// @include       http://forums*.ebay.tld/*thread.jspa?*
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
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

const QUOPNG = "data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI" +
"WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QgWFBAsqBARoAAAAodJREFUOMuNk0tIVHEUxn//O3fu" +
"nRkasUHpQU/IHmCbXFS0MEwKwkVhJbUQatODiMKMMIxeWtNDioIKshRpQF0VBFlQYNQ00CwKqlFw" +
"siDwkTNMinPvHe/9twjNsYE6cLa/7zvnfEcAu/m/sjW3++W+NcU1i+bO2TucSNxo6o40Ul5e3iil" +
"HM/RaSll2rKsdMZ20slU8ueeis2Dl+uOS5kYls+vBe2asg37VVVVFcBrmuZvGdvGNE0syyKTySCF" +
"iuYLcLK6zGN6l/lXrF9HKjnEap9bee3xHFAn/TmOgxACRVHQNA0pJW7dh+Lx01S9jJLCPhZvP01F" +
"xTZ6v8R48C7qJEdG7qnTh5RSIoTA5XLhzwugqFC/bQnLA1+pOvuI0eFe3n/4SFNTkN5IuCcSi99W" +
"cm1L0z24Vbh4bBNFga/sPNuFYTgkPrXQfqaYAmeASCzeLqV0sgBCCDTdgyLgwpFSFqReUHX+BRnL" +
"YDAa5FHnR0adtTQ0PwMwAFQppZiurAg4d3gdS80IOxq6sdIpBt8F6Qy95btYS92d53jdf0SnHCiK" +
"C0VA/cGNFNkRdl14Q8YYZSh6hYetb4jP2sLFUBi/N3vcKYCua8Tj/eSvrKLsfBJrfITh6CUe3Ovm" +
"W/5m7oeekucVSDsztfMsAEBz8122lJYwlhjgc1+CuzdfYa+qpiXUhQAmMiaapuV2AKAqgsLC2cT7" +
"e2i41cHCrYcIXm/FkWAYxu9suN1ZABUQACdqjzLL56O29hQTUtDW1kGe34ftSCzTyHVtOQkAIPbp" +
"M/mBAi5dvcH8+fMAME0Tx3GYGbaZDgB4/KTrLwld1//5omo4HP5RWVl5XQghc1mcGbTJ8nq9YwC/" +
"ALqxG8ITSuxtAAAAAElFTkSuQmCC";

const STARTTAG = '<font color="#000099" size="-1">';
const ENDTAG = '</font>';

var tarea = document.getElementById("body01");
if (tarea == null) {
    return; // requires function wrapper in Opera
}
var anchors = document.evaluate("//tr[@class = 'ebayUserRow' or @class = " +
    "'ebayRootUserRow' or @class = 'pinkliner']//a[@name]/ancestor::td[1]",
    document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var postings = document.evaluate("//td[@class='jive-description']",
    document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var userIDs = document.evaluate("//tr[@class = 'ebayUserRow' or @class = " +
    "'ebayRootUserRow' or @class = 'pinkliner']//a[@name]/" +
    "following-sibling::a[1]/text()", document.body, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var numbers = document.evaluate("//tr[@class = 'ebayUserRow' or @class = " +
    "'ebayRootUserRow' or @class = 'pinkliner']//td[@class = " +
    "'messageBoxDate'][2]", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < anchors.snapshotLength; i++) {
    anchors.snapshotItem(i).appendChild(createImg("quote", i));
}

function createImg(type, ID) {
    var img =  document.createElement("img");
    switch (type) {
        case "quote":
            img.src = QUOPNG;
            img.title = "Quote posting";
            img.id = "quo" + ID;
            img.setAttribute("style", "position: relative; top: 4px; " +
                "padding-left: 2px; cursor: pointer;");
            img.addEventListener('click',
                function(event) {
                    quote(event);
                }, false // true doesn't work in Opera
            );
            return img;
        default:
            return null;
    }
}

function quote(event) {
    var ID = event.target.id.slice(3, event.target.id.length);
    var posting =  postings.snapshotItem(ID);
    var userID =  userIDs.snapshotItem(ID).data;
    var textNodes = document.evaluate(".//text()", posting, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var node, number;
    if (ID == 0) {
        number = "0";
    } else {
        node = numbers.snapshotItem(ID - 1).childNodes[0];
        if (node.nodeType != 3) {
            number = node.childNodes[0].data;
        } else {
            number = node.data.split(" ")[0];
        }
    }
    var sep = "\n\n";
    if (tarea.value.length == 0) {
        sep = "";    
    }
    var quotes = new Array();
    var text;
    for (var i = 0; i < textNodes.snapshotLength; i++) {
        text = textNodes.snapshotItem(i).data;
        text = text.replace(/^\s*/, "");
        text = text.replace(/\s*$/, "");
        if (text.length > 0) {
            quotes.push(text);
        }
    }
    var s = tarea.value + sep + "@" + userID +"#" + parseInt(number) + "\n";
    for (var i = 0; i < quotes.length - 1; i++) {
        s = s + STARTTAG + quotes[i] + ENDTAG + "\n\n\n\n";
    }
    s = s + STARTTAG + quotes[quotes.length - 1] + ENDTAG + "\n\n";
    tarea.value = s;
}

})(); // function wrapper for Opera