// eBay Forum Slim Mode user script
// version 0.5.5
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
// @name          eBay Forum Slim Mode
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5065
// @include       http://forums*.ebay.tld/*
// @include       http://answercent*.ebay.tld/*
//                for Opera (which doesn't understand tld):
// @include       http://forums.ebay.com/*
// @include       http://forums.ebay.com.au/*
// @include       http://forums-be*.ebay.be/*
// @include       http://forums.ebay.ca/*
// @include       http://forums.ebay.fr/*
// @include       http://forums.ebay.com.hk/*
// @include       http://forums.ebay.in/*
// @include       http://forums.ebay.co.uk/*
// @include       http://forums.ebay.it/*
// @include       http://forums.ebay.com.my/*
// @include       http://forums.ebay.nl/*
// @include       http://forums.ebay.ph/*
// @include       http://forums.ebay.pl/*
// @include       http://forums.ebay.com.sg/*
// @include       http://forums.ebay.es/*
// @include       http://answercenter.ebay.com/*
// @include       http://answercenter.ebay.com.au/*
// @include       http://answercenter.ebay.ca/*
// @include       http://answercenter.ebay.com.hk/*
// @include       http://answercenter.ebay.com.my/*
// @include       http://answercenter.ebay.com.sg/*
// @include       http://answercenter.ebay.pl/*
// @include       http://answercentre.ebay.co.uk/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

const SHOPNG = "data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI" +
"WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1ggMFQYHoMbyVQAAATpJREFUKM+dkrFOwlAUhv/TXguk" +
"SZM21HLBMOnQGHdfwImFnecwTr6CD0PiyO5ujEwMxDbSJkBSCLT09rpoK3KHxjOd3Pt/9/z57yEo" +
"yuFO4N/63UxkmL5MwyRKen81TAXyK07D+yE26QbRQ0RJlJxoNBUopcQhPSBPc0gpVRI1WKf+DTLT" +
"NYPOZYcIVB7aPdsTuUAhCrT7bc9gRvhzR0SIZ7Ek/86Xo8cR9EIvwUIUYN+55TKHxipjzGAYP43B" +
"VtsVJu8TiFxU4YjjQEiv3OhnOmafM5DhGIF5YdLv9FrnLa8/6GsAMH+eF7totygfAWH7sZUsW2a9" +
"bJkdT7ihkBhxANhH+8X6dd2ttQAEQpM1y772dxARuMXBLQ4iNaicqGkabMsue7UrRTWcRuBeu10A" +
"iN/iMF2mJ0v+BTdAbTHWdiw9AAAAAElFTkSuQmCC";

const HIDPNG = "data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI" +
"WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1ggMFQYm7K/iCwAAANxJREFUKM/lkT1OAzEQhd94zJiw" +
"VVZCSlCUBg6wfY4SrpAj5Aq0FNwifU6RYiWKrRKE5MKRYNNge+jWRfYCiK988/+GMQZBRESZmVJK" +
"ir8Nj4nzxzlt3jZm9byanr/Pxr/7nysbqvvqNHuaEYEG0d05M3ET8C1z8CHnmNNQQATfebXLZvmw" +
"3q7BuQzPKcPCAgCiRhhrhpgVi93LDjb0Aft2jxRT2UOv3lNuu2F0nx1IajlVi4pUS7axxkgtkKkg" +
"fkVcPi659CD0x15pzBxXO2q2jbJjtK8twiHgP/ILeNlIABwUZR4AAAAASUVORK5CYII=";

var nodes = new Array();
var result = document.evaluate("//td[@class='poweredByLiveworld']", document,
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (result.snapshotLength > 0) {
    nodes.push(result.snapshotItem(0));
}
result = document.evaluate("//div[contains(@id, 'jive-') or contains(@class," +
    "'jive-thread-list') or contains(@class, 'jive-settings') or " +
    "contains(@class, 'jive-search-form') or contains(@class, " +
    "'jive-post-form') or contains(@class, 'jive-messagebox') or " +
    "contains(@class, 'jive-message-list')]" +
    "/ancestor::td[1]/following-sibling::td[1 or 2]",
    document,
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (result.snapshotLength > 0) {
    for (var i = 0; i < result.snapshotLength; i++) {
        nodes.push(result.snapshotItem(i));
    }
}
var start = document.evaluate("//div[@id='jive-forumpage']", document,
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var span, text, parent;
if (start != null) {
    check(start);
}
for (var i = 0; i < nodes.length; i++) {
    nodes[i].style.display = "none";
}
result = document.evaluate("//*[@class='ebayTitle']", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (result.snapshotItem(0) == null) {
    return; // requires function wrapper in Opera
}
var anchor = result.snapshotItem(0).lastChild;
var imgSpan = document.createElement('span');
imgSpan.id = "imgspan";
imgSpan.style.cursor = "pointer";
imgSpan.appendChild(createImg("show"));
anchor.parentNode.appendChild(imgSpan);

function createImg(type) {
    var img =  document.createElement("img");
    switch (type) {
        case "show":
            img.src = SHOPNG;
            img.title = "Show content";
            img.setAttribute("style", "position: relative; top: 1px; " +
                "padding-left: 0px");
            img.addEventListener('click',
                function(event) {
                    show(event);
                }, false // true doesn't work in Opera
            );
            return img;
        case "hide":
            img.src = HIDPNG;
            img.title = "Hide content";
            img.setAttribute("style", "position: relative; top: 0px; " +
                "padding-left: 0px");
            img.addEventListener('click',
                function(event) {
                    hide(event);
                }, false // true doesn't work in Opera
            );
            return img;
        default:
            return null;
    }
}

function show(event) {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].style.display = "";
    }
    imgSpan.replaceChild(createImg("hide"), imgSpan.firstChild);
}

function hide(event) {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].style.display = "none";
    }
    imgSpan.replaceChild(createImg("show"), imgSpan.firstChild);
}

function check(node) {
    if (node.nodeType == 3) {
        span = document.createElement("span");
        text = document.createTextNode(node.data);
        span.appendChild(text);
        parent = node.parentNode;
        parent.replaceChild(span, node);
        nodes.push(span);
        return false;
    }
    if (node.getAttribute('class') == 'ebayTableTitle' ||
        node.getAttribute('bgcolor') == '#e6e6f2') {
        return true;
    }
    if(node.hasChildNodes()) {
        for (var i = 0; i < node.childNodes.length; i++) {
            if (check(node.childNodes[i])) {
                return true;
            }
        }
        nodes.push(node);
    } else {
        nodes.push(node);
    }
}

})(); // function wrapper for Opera