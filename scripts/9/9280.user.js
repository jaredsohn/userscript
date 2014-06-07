// eBay Feedback Show Comments user script
// Version 0.2.1
// 2008-04-10
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
// @name          eBay Feedback Show Comments
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/9280
// @include       http://feedback*.ebay.tld/ws/eBayISAPI.dll?*
//                for Opera (which doesn't understand tld):
// @include       http://feedback.ebay.com.au/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.at/ws/eBayISAPI.dll?*
// @include       http://feedback.befr.ebay.be/ws/eBayISAPI.dll?*
// @include       http://feedback.benl.ebay.be/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.ca/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.fr/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.de/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.com.hk/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.in/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.ie/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.it/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.com.my/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.nl/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.ph/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.pl/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.com.sg/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.es/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.ch/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.co.uk/ws/eBayISAPI.dll?*
// @include       http://feedback.ebay.com/ws/eBayISAPI.dll?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

var tld = document.domain.split(".ebay.")[1];
var anchor = document.evaluate("//table[@class='fbOuter']/tbody", document,
    null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if (!anchor) {
    anchor = document.evaluate("//table[@class='FbOuterYukon']/tbody", document,
        null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}
var userID = document.evaluate("//a[contains(@href, 'http://myworld.')]" +
    "/text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0).data;
var cap1, cap2, cap3, cap4, cap5, cap6;
var be = "";
switch (tld) {
    case "de":
    case "at":
    case "ch":
        cap1 = 'Kommentare: ';
        cap2 = 'Alle';
        cap3 = 'Positive';
        cap4 = 'Neutral';
        cap5 = 'Negative';
        cap6 = 'Zur&uuml;ckgenommen';
        tempText = 'In Bearbeitung...';
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
        cap1 = 'Comments: ';
        cap2 = 'All';
        cap3 = 'Positive';
        cap4 = 'Neutral';
        cap5 = 'Negative';
        cap6 = 'Withdrawn';
        tempText = 'Loading...';
        break;
    case "be":
        be = document.domain.split(".ebay.")[0].split("feedback")[1];
    default:
        cap1 = 'Comments: ';
        cap2 = 'All';
        cap3 = 'Positive';
        cap4 = 'Neutral';
        cap5 = 'Negative';
        cap6 = 'Withdrawn';
        tempText = 'Loading...';
        break;
}
var activeTabURL = document.evaluate("//ul[@class='navtabs']/" +
    "li[@class='active']/a/@href", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var ftab = "";
if (!activeTabURL) {
    activeTabURL = document.evaluate("//td[@class='pageTab-activeRgt']",
        document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null).snapshotItem(0);
    if (!activeTabURL) {
        return;
    }
    var split = activeTabURL.id.split("_");
    switch (split[split.length - 1]) {
        case 1:
            ftab = "&ftab=FeedbackAsSeller" ;
            break;
        case 2:
            ftab = "&ftab=FeedbackAsBuyer" ;
            break;
        case 3:
            ftab = "&ftab=AllFeedback" ;
            break;
        case 4:
            ftab = "&ftab=FeedbackLeftForOthers" ;
            break;
        default:
            ftab = "&ftab=AllFeedback" ;
            break;
    }   
} else {
    var index = activeTabURL.value.indexOf("ftab=");
    if (index >= 0) {
        ftab = "&" + activeTabURL.value.slice(index).split("&")[0];
    }
}
var tr = anchor.firstChild.innerHTML;
var fb, check, maxPages, step, td, filter, all, positive, neutral, negative;
var steps = 0
var loaded = false;
var tabcontentInner = document.evaluate("//div[@class='tabcontentInner']/*",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);
if (!tabcontentInner) {
    var tabcontentInner = document.evaluate("//div[@class='FeedbackTabs']/" +
        "following-sibling::table//td[1]/table/tbody/tr/" +
        "td[@class='FeedBackStatusLineViewing']", document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    tabcontentInner.setAttribute("style", "white-space: nowrap;");
    tabcontentInner.parentNode.setAttribute("style", "white-space: nowrap;");
}
var span = document.createElement("span");
span.innerHTML = "|";
span.setAttribute("style", "margin-left: 10px; margin-right: 10px;");
tabcontentInner.appendChild(span);
tabcontentInner.setAttribute("id", "tabcontentInner");
span = document.createElement("span");
span.setAttribute("id", "comLinks");
span.innerHTML = cap1 + '<a href="#tabcontentInner" id="comAll">' + cap2 +
    '</a> | <a href="#tabcontentInner" id="comPos">' + cap3 +
    '</a> | <a href="#tabcontentInner" id="comNeu">' + cap4 +
    '</a> | <a href="#tabcontentInner" id="comNeg">' + cap5 +
    '</a> | <a href="#tabcontentInner" id="comWit">' + cap6 +
    '</a>';
tabcontentInner.appendChild(span);
var link = document.getElementById("comAll");
link.addEventListener('click',
    function(event) {
        click("all");
    }, false
);
link = document.getElementById("comPos");
link.addEventListener('click',
    function(event) {
        click("positive");
    }, false
);
link = document.getElementById("comNeu");
link.addEventListener('click',
    function(event) {
        click("neutral");
    }, false
);
link = document.getElementById("comNeg");
link.addEventListener('click',
    function(event) {
        click("negative");
    }, false
);
link = document.getElementById("comWit");
link.addEventListener('click',
    function(event) {
        click("withdrawn");
    }, false
);

function click(paramFilter) {
    filter = paramFilter;
    if (!loaded) {
        scrapFirst();
    } else {
        switchView();    
    }
}

function scrapFirst() {
    anchor.innerHTML = '<tr><td class="header" width="100%" ' +
        'colspan="4" align="center" id="progres">' + tempText + ' 0%</td></tr>';
    td = document.getElementById("progres");
    var regExp1 = /<span><b>[^<]+<\/b>[\D]+(\d+)<\/span>/;
    var xmlHttp = new XMLHttpRequest();
    if (xmlHttp) {
        xmlHttp.open('GET', 'http://feedback' + be + '.ebay.' + tld +
            '/ws/eBayISAPI.dll?ViewFeedback2&items=200&page=1&userid=' +
            userID + ftab, true);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    var matches = xmlHttp.responseText.match(regExp1);
            		if(matches) {
            		    maxPages = matches[1];
            		    if (maxPages > 200) {
            		        maxPages = 200;
            		    }
            		    if (maxPages == 0) {
            		        anchor.innerHTML = '<tr>' + tr + '</tr>';
            		        aftermath();
            		        return;
            		    }
            		    fb = new Array(maxPages);
            		    check = new Array(maxPages);
            		    step = 1 / maxPages;
            		    for (var i = 0; i < maxPages ; i++) {
            		        check[i] = 0;
            		        fb[i] = "";
            		    }
            		    for (var i = 0; i < maxPages; i++) {
            		        scrap(i + 1);
            		    }
            		} else {
            		    maxPages = 200;
            		    fb = new Array(maxPages);
            		    check = new Array(maxPages);
            		    step = 1 / maxPages;
            		    for (var i = 0; i < maxPages ; i++) {
            		        check[i] = 0;
            		        fb[i] = "";
            		    }
            		    for (var i = 0; i < maxPages; i++) {
            		        scrap(i + 1);
            		    }
            		}
                } else {
                    anchor.innerHTML = '<tr>' + tr + '</tr>'; 
    		        aftermath();
    		        return;
                }
            }
        }
        xmlHttp.send(null);
    }
}

function scrap(page) {
    var regExp2 = /(<tr class="fbOuterAddComm"><td[^>]+>(<img[^>]+>|&nbsp;)<\/td><td[^>]+>[^<]+<\/td><td[^>]+>[^<]*<div[^>]+><a[^>]+>[^<]+<\/a>[^<]+<a[^>]+>[^<]+<\/a>(<img[^>]+>)?[^<]+<\/div>(<br>[^<]+)?<\/td><td[^>]+>[^<]+<\/td>(<td[^>]+><a[^>]+><\/a><a[^>]+><img[^>]+><\/a><\/td>)?<\/tr><tr><td>[^<]*<\/td><td[^>]+><ul[^>]*><li><div>(<div>)?<b>[^<]+<\/b>([^<]+<\/div>)?<\/div><span>([^<]+|<div>[^<]+<a[^>]+>[^<]+<\/a>[^<]+<\/div>)<\/span>(<ul[^>]*><li><div>(<div>)?<b>[^<]+<\/b>([^<]+<\/div>)?<\/div><span>([^<]+|<div>[^<]+<a[^>]+>[^<]+<\/a>[^<]+<\/div>)<\/span>(<ul[^>]*><li><div>(<div>)?<b>[^<]+<\/b>([^<]+<\/div>)?<\/div><span>([^<]+|<div>[^<]+<a[^>]+>[^<]+<\/a>[^<]+<\/div>)<\/span><\/li><\/ul>)?<\/li><\/ul>)?<\/li><\/ul><\/td><\/tr><tr class="bot"><td>[^<]+<\/td><td>[^<]+<\/td><td>[^<]+<\/td><td[^>]*>[^<]*(<a[^>]+>[^<]+<\/a>)?<\/td>(<td>[^<]+<\/td>)?<\/tr>)/ig;
    var xmlHttp = new XMLHttpRequest();
    if (xmlHttp) {
        xmlHttp.open('GET', 'http://feedback' + be + '.ebay.' + tld +
            '/ws/eBayISAPI.dll?ViewFeedback2&items=200&userid=' + userID
            +'&page=' + page + ftab, true);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    var matches = xmlHttp.responseText.match(regExp2);
                    var sum = 0;
                    check[page - 1] = 1;
                    var localFb = "";
                    steps += step;
                    td.innerHTML = tempText + " " + Math.ceil(steps*100) + "%";
                    if(matches) {
                        for (var i = 0; i < matches.length; i++) {
                            localFb += matches[i];
                        }
                        fb[page - 1] = localFb;
                        for (var i = 0; i < maxPages ; i++) {
                            sum += check[i];
                        }
                        if (sum == maxPages) {
                            localFb = "";
                            for (var i = 0; i < maxPages ; i++) {
                                localFb += fb[i];
                            }
                            anchor.innerHTML = '<tr>' + tr + '</tr>' + localFb;
                            steps = 0;
                            aftermath();
                        }
                    } else {
                        for (var i = 0; i < maxPages ; i++) {
                            sum += check[i];
                        }
                        if (sum == maxPages) {
                            for (var i = 0; i < maxPages ; i++) {
                                localFb += fb[i];
                            }
                            anchor.innerHTML = '<tr>' + tr + '</tr>' + localFb;
                            steps = 0;
                            aftermath();
                        }
                    }
                } else {
                    var sum = 0;
                    check[page - 1] = 1;
                    var localFb = "";
                    steps += step;
                    td.innerHTML = tempText + " " + Math.ceil(steps*100) + "%";
                    for (var i = 0; i < maxPages ; i++) {
                        sum += check[i];
                    }
                    if (sum == maxPages) {
                        for (var i = 0; i < maxPages ; i++) {
                            localFb += fb[i];
                        }
                        anchor.innerHTML = '<tr>' + tr + '</tr>' + localFb;
                        steps = 0;
                        aftermath();
                    }
                }
            }
        }
        xmlHttp.send(null);
    }
}

function aftermath() {
    loaded = true;
    positive = document.evaluate(".//img[contains(@src, 'iconPos_16x16.gif')]" +
        "/ancestor::td[@class='fbOuterAddComm']/ancestor::tr[@class=" +
        "'fbOuterAddComm']|.//img[contains(@src, 'iconPos_16x16.gif')]/" +
        "ancestor::td[@class='fbOuterAddComm']/ancestor::tr[@class=" +
        "'fbOuterAddComm']/following-sibling::tr[position()=1 or position()=2]",
        anchor, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    neutral = document.evaluate(".//img[contains(@src, 'iconNeu_16x16.gif')]" +
        "/ancestor::td[@class='fbOuterAddComm']/ancestor::tr[@class=" +
        "'fbOuterAddComm']|.//img[contains(@src, 'iconNeu_16x16.gif')]/" +
        "ancestor::td[@class='fbOuterAddComm']/ancestor::tr[@class=" +
        "'fbOuterAddComm']/following-sibling::tr[position()=1 or position()=2]",
        anchor, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    negative = document.evaluate(".//img[contains(@src, 'iconNeg_16x16.gif')]" +
        "/ancestor::td[@class='fbOuterAddComm']/ancestor::tr[@class=" +
        "'fbOuterAddComm']|.//img[contains(@src, 'iconNeg_16x16.gif')]/" +
        "ancestor::td[@class='fbOuterAddComm']/ancestor::tr[@class=" +
        "'fbOuterAddComm']/following-sibling::tr[position()=1 or position()=2]",
        anchor, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    withdrawn = document.evaluate("./tr[@class='fbOuterAddComm']/td[@class=" +
        "'fbOuterAddComm'][position()=1]/text()/ancestor::td[@class=" +
        "'fbOuterAddComm']/ancestor::tr[@class='fbOuterAddComm']|./tr[@class=" +
        "'fbOuterAddComm']/td[@class='fbOuterAddComm'][position()=1]/text()/" +
        "ancestor::td[@class='fbOuterAddComm']/ancestor::tr[@class=" +
        "'fbOuterAddComm']/following-sibling::tr[position()=1 or position()=2]",
        anchor, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    all = document.evaluate("./tr[position()!=1]", anchor, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    switchView();
}

function switchView() {
    switch (filter) {
        case "positive":
            for (var i = 0; i < all.snapshotLength; i++) {
                all.snapshotItem(i).setAttribute("style", "display:none");
            }
            for (var i = 0; i < positive.snapshotLength; i++) {
                positive.snapshotItem(i).setAttribute("style",
                    "display:table-row");
            }
            link = document.getElementById("comAll");
            link.innerHTML = cap2;
            link = document.getElementById("comPos");
            link.innerHTML = '<strong>' + cap3 + '</strong>';
            link = document.getElementById("comNeu");
            link.innerHTML = cap4;
            link = document.getElementById("comNeg");
            link.innerHTML = cap5;
            link = document.getElementById("comWit");
            link.innerHTML = cap6;
            break;
        case "neutral":
            for (var i = 0; i < all.snapshotLength; i++) {
                all.snapshotItem(i).setAttribute("style", "display:none");
            }
            for (var i = 0; i < neutral.snapshotLength; i++) {
                neutral.snapshotItem(i).setAttribute("style",
                    "display:table-row");
            }
            link = document.getElementById("comAll");
            link.innerHTML = cap2;
            link = document.getElementById("comPos");
            link.innerHTML = cap3;
            link = document.getElementById("comNeu");
            link.innerHTML = '<strong>' + cap4 + '</strong>';
            link = document.getElementById("comNeg");
            link.innerHTML = cap5;
            link = document.getElementById("comWit");
            link.innerHTML = cap6;
            break;
        case "negative":
            for (var i = 0; i < all.snapshotLength; i++) {
                all.snapshotItem(i).setAttribute("style", "display:none");
            }
            for (var i = 0; i < negative.snapshotLength; i++) {
                negative.snapshotItem(i).setAttribute("style",
                    "display:table-row");
            }
            link = document.getElementById("comAll");
            link.innerHTML = cap2;
            link = document.getElementById("comPos");
            link.innerHTML = cap3;
            link = document.getElementById("comNeu");
            link.innerHTML = cap4;
            link = document.getElementById("comNeg");
            link.innerHTML = '<strong>' + cap5 + '</strong>';
            link = document.getElementById("comWit");
            link.innerHTML = cap6;
            break;
        case "withdrawn":
            for (var i = 0; i < all.snapshotLength; i++) {
                all.snapshotItem(i).setAttribute("style", "display:none");
            }
            for (var i = 0; i < withdrawn.snapshotLength; i++) {
                withdrawn.snapshotItem(i).setAttribute("style",
                    "display:table-row");
            }
            link = document.getElementById("comAll");
            link.innerHTML = cap2;
            link = document.getElementById("comPos");
            link.innerHTML = cap3;
            link = document.getElementById("comNeu");
            link.innerHTML = cap4;
            link = document.getElementById("comNeg");
            link.innerHTML = cap5;
            link = document.getElementById("comWit");
            link.innerHTML = '<strong>' + cap6 + '</strong>';
            break;
        case "all":
        default:
            for (var i = 0; i < all.snapshotLength; i++) {
                all.snapshotItem(i).setAttribute("style", "display:table-row");
            }
            link = document.getElementById("comAll");
            link.innerHTML = '<strong>' + cap2 + '</strong>';
            link = document.getElementById("comPos");
            link.innerHTML = cap3;
            link = document.getElementById("comNeu");
            link.innerHTML = cap4;
            link = document.getElementById("comNeg");
            link.innerHTML = cap5;
            link = document.getElementById("comWit");
            link.innerHTML = cap6;
            break;
    }
}

})(); // function wrapper for Opera