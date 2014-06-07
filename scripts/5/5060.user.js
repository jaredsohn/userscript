// ==UserScript==
// @name          eBay Hacks - Show only negative feedback Mod
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5060
// @version       0.6.2
// @date          2010-10-27
// @copyright     2006-2010, thorbenhauer
// @license       GPL 2 or later
// @include       http://feedback*.ebay.tld/*ws/eBayISAPI.dll?*
//                for Opera (which doesn't understand tld):
// @include       http://feedback.ebay.com.au/*ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.at/*ws/eBayISAPI.dll?*
// @include       http://feedback.befr.ebay.be/*ws/eBayISAPI.dll?*
// @include       http://feedback.benl.ebay.be/*ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.ca/*ws/eBayISAPI.dll?*
// @include       http://feedback.cafr.ebay.ca/*ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.fr/*ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.de/*ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.com.hk/*ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.in/*ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.ie/*ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.it/*ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.com.my/*ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.nl/*ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.ph/*ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.pl/*ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.com.sg/*ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.es/*ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.ch/*ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.co.uk/*ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.com/*ws/eBayISAPI.dll?*
// ==/UserScript==
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
// Based on eBay Hacks - Show only negative feedback user script
// Script location: http://userscripts.org/scripts/show/696
//
// -----------------------------------------------------------------------------
//
// With Contributions by Lucas Malor (http://userscripts.org/users/27940)
// and Mithrandir (http://userscripts.org/users/5587)
// Thanks!
//
// -----------------------------------------------------------------------------

(function () { // function wrapper for Opera

/*
 Configure site
 
 Possible values:
 - "toolhaus"
   Show only the negative and neutral comments via toolhaus.org.
 - "ebay"
   Show only the negative comments for the last 365 days via internal eBay
   function.
*/
var site = "toolhaus";

/*
 Configure view (only relevant when site = "toolhaus")
 
 Possible values:
 - true
   Loads toolhaus.org in an iframe.
 - false
   Create regular links to toolhaus.org
*/
var iFramed = true;

var userid, anchor, rcvdURL, rcvdString, rcvdTitle, leftURL, leftString,
    leftTitle;
var tld = document.domain.split(".ebay.")[1];
var be = "";
if (tld == "be") {
    be = "." + document.domain.split(".ebay.")[0].split(".")[1];
}
switch (site) {
    case "ebay":
        rcvdURL = "http://feedback" + be + ".ebay." + tld +
            "/ws/eBayISAPI.dll?ViewFeedback2&ftab=AllFeedback&" +
            "items=200&interval=365&which=negative&userid=";
        break;
    case "toolhaus":
        rcvdURL = "http://toolhaus.org/cgi-bin/negs?Dirn=Received+by&User=";
        leftURL = "http://toolhaus.org/cgi-bin/negs?Dirn=Left+by&User=";
        break;
    default:
        rcvdURL = "http://toolhaus.org/cgi-bin/negs?Dirn=Received+by&User=";
        leftURL = "http://toolhaus.org/cgi-bin/negs?Dirn=Left+by&User=";
        break; 
}
switch (tld) {
    case "de":
    case "at":
    case "ch":
        if (site == "toolhaus") {
            rcvdURL =
                "http://toolhaus.org/cgi-bin/negs-de?Dirn=Erhaltene&User=";
            leftURL =
                "http://toolhaus.org/cgi-bin/negs-de?Dirn=Abgegebene&User=";
        }
        rcvdString = "Erh. Beschw.";
        rcvdTitle = "Erhaltene Beschwerden";
        leftString = "Abg. Beschw.";
        leftTitle = "Abgegebene Beschwerden";
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
        rcvdString = "Comp. rec.";
        rcvdTitle = "Complaints received";
        leftString = "Comp. left";
        leftTitle = "Complaints left";
        break;
    case "it":
        rcvdString = "Neg. ricevuti";
        rcvdTitle = "Neg. ricevuti";
        leftString = "Neg. dati";
        leftTitle = "Neg. dati";
        break;
    default:
        rcvdString = "Comp. rec.";
        rcvdTitle = "Complaints received";
        leftString = "Comp. left";
        leftTitle = "Complaints left";
        break;
}
 
anchor = document.evaluate("//p[@id = 'fbtab_wrp']", document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
userid = document.evaluate("//td[@id = 'memberBadgeId']" +
    "//a[contains(@href, 'http://myworld.')]" +
    "//span[@class ='mbg-nw']", document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
var a = document.createElement("a");
a.setAttribute("href", rcvdURL + userid);
a.setAttribute("id", "rcvd");
a.innerHTML = rcvdString;
anchor.appendChild(a);
if (site == "toolhaus" && iFramed) {
    var div, rcvdIframe, leftIframe, bckp, parent, active;
    a.addEventListener("click", framing, false);
    bckp = document.evaluate("//table[@class='FbOuterYukon']/ancestor::div[1]",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
    parent = bckp.parentNode;
    div = document.createElement("div");
    parent.replaceChild(div, bckp);
    div.appendChild(bckp);
    active = document.evaluate("//a[@class='btb-act']",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
    active.setAttribute("id", "bckp");
    active.addEventListener("click", framing, false);
}
if (site != "ebay") {
    a = document.createElement("a");
    a.setAttribute("href", leftURL + userid);
    a.setAttribute("id", "left");
    a.innerHTML = leftString;
    anchor.appendChild(a);
    if (site == "toolhaus" && iFramed) {
        a.addEventListener("click", framing, false);
    }
}
anchor = document.getElementsByTagName("head")[0];
var style = document.createElement("style");
style.innerHTML = ".btb-w {padding: 5px 0 0 5px} " +
    ".btb a {padding: 7px 5px} .btb .btb-act .btb a:hover " +
    "{padding: 8px 5px 7px}";
anchor.appendChild(style);

function framing(event) {
    event.preventDefault();
    switch (event.target.id) {
        case "rcvd":
            bckp.style.display = "none";
            if (leftIframe != null) {
                leftIframe.style.display = "none";
            }
            if (rcvdIframe == null) {
                rcvdIframe = createIframe("rcvd", userid);
                div.appendChild(rcvdIframe);
            }
            rcvdIframe.style.display = "";
            break;
        case "left":
            bckp.style.display = "none";
            if (rcvdIframe != null) {
                rcvdIframe.style.display = "none";
            }
            if (leftIframe == null) {
                leftIframe = createIframe("left", userid);
                div.appendChild(leftIframe);
            }
            leftIframe.style.display = "";
            break;
        case "bckp":
            if (rcvdIframe != null) {
                rcvdIframe.style.display = "none";
            }
            if (leftIframe != null) {
                leftIframe.style.display = "none";
            }
            bckp.style.display = "";
            break;
    }
    active.setAttribute("class", "");
    event.target.setAttribute("class", "btb-act");
    active = event.target;
}

function createIframe(mode, uid) {
    var iframe = document.createElement("iframe");
    switch (mode) {
        case "rcvd":
            iframe.setAttribute("src", rcvdURL + uid);
            break;
        case "left":
            iframe.setAttribute("src", leftURL + uid);
            break;
    }
    iframe.setAttribute("style", "background-color: white; " +
        "width: 99.6%; height: 860px; display: block;");
    return iframe;
}

})(); // function wrapper for Opera
