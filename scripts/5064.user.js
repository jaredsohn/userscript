// eBay Forum Login Check user script
// version 0.4.2
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
// @name          eBay Forum Login Check
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5064
// @include       http://forums*.ebay.tld/*
// @include       http://answercent*.ebay.tld/*
// @include       http://community.ebay.de/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------

const ADDPNG = "data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI" +
"WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1ggMFQYHoMbyVQAAATpJREFUKM+dkrFOwlAUhv/TXguk" +
"SZM21HLBMOnQGHdfwImFnecwTr6CD0PiyO5ujEwMxDbSJkBSCLT09rpoK3KHxjOd3Pt/9/z57yEo" +
"yuFO4N/63UxkmL5MwyRKen81TAXyK07D+yE26QbRQ0RJlJxoNBUopcQhPSBPc0gpVRI1WKf+DTLT" +
"NYPOZYcIVB7aPdsTuUAhCrT7bc9gRvhzR0SIZ7Ek/86Xo8cR9EIvwUIUYN+55TKHxipjzGAYP43B" +
"VtsVJu8TiFxU4YjjQEiv3OhnOmafM5DhGIF5YdLv9FrnLa8/6GsAMH+eF7totygfAWH7sZUsW2a9" +
"bJkdT7ihkBhxANhH+8X6dd2ttQAEQpM1y772dxARuMXBLQ4iNaicqGkabMsue7UrRTWcRuBeu10A" +
"iN/iMF2mJ0v+BTdAbTHWdiw9AAAAAElFTkSuQmCC";

const REMPNG = "data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI" +
"WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1ggMFQYm7K/iCwAAANxJREFUKM/lkT1OAzEQhd94zJiw" +
"VVZCSlCUBg6wfY4SrpAj5Aq0FNwifU6RYiWKrRKE5MKRYNNge+jWRfYCiK988/+GMQZBRESZmVJK" +
"ir8Nj4nzxzlt3jZm9byanr/Pxr/7nysbqvvqNHuaEYEG0d05M3ET8C1z8CHnmNNQQATfebXLZvmw" +
"3q7BuQzPKcPCAgCiRhhrhpgVi93LDjb0Aft2jxRT2UOv3lNuu2F0nx1IajlVi4pUS7axxkgtkKkg" +
"fkVcPi659CD0x15pzBxXO2q2jbJjtK8twiHgP/ILeNlIABwUZR4AAAAASUVORK5CYII=";

var blacklist = getBlacklist();
var anchor, userID;
if (document.domain == "community.ebay.de") {
    anchor = document.evaluate("//p[@class='idm-messagecenter-pinboard']",
        document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null).snapshotItem(0);
} else {
    anchor = document.evaluate("//td[@class='ebayWelcome']//b", document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}
if (anchor == null) {
    return;
}
if (document.domain == "community.ebay.de") {
    userID = anchor.innerHTML.split(",")[0].split("Hallo ")[1];
    if (userID == null) {
        return;
    }
} else {
    userID = anchor.innerHTML;
}
var imgSpan = document.createElement('span');
    imgSpan.id = "imgspan";
    imgSpan.style.cursor = "pointer";
if (checkList(blacklist, userID) >= 0) {
    imgSpan.appendChild(createImg("rem"));
    anchor.parentNode.insertBefore(imgSpan, anchor.nextSibling);
    alert("Attention! Your logged in as " + userID + "! This account is " +
        "on your blacklist!");
} else {
    imgSpan.appendChild(createImg("add"));
    anchor.parentNode.insertBefore(imgSpan, anchor.nextSibling);
}
    
function createImg(type) {
    var img =  document.createElement("img");
    switch (type) {
        case "add":
            img.src = ADDPNG;
            img.title = "Add to blacklist";
            img.id = "add";
            if (document.domain == "community.ebay.de") {
                img.setAttribute("style", "padding-left:4px; " +
                    "position: relative; top: 14px;");
            } else {
                img.setAttribute("style", "padding-left:4px; " +
                    "position: relative; top: 2px;");
            }
            img.addEventListener('click',
                function(event) {
                    add(event);
                }, true
            );
            return img;
        case "rem":
            img.src = REMPNG;
            img.title = "Remove from blacklist";
            img.id = "rem";
            if (document.domain == "community.ebay.de") {
                img.setAttribute("style", "padding-left:4px; " +
                    "position: relative; top: 14px;");
            } else {
                img.setAttribute("style", "padding-left:4px; " +
                    "position: relative; top: 2px;");
            }
            img.addEventListener('click',
                function(event) {
                    remove(event);
                }, true
            );
            return img;
        default:
            return null;
    }
}

function add(event) {
    blacklist = getBlacklist();
    if (checkList(blacklist, userID) < 0) {
        blacklist.push(userID);
        setBlacklist(blacklist);
    }
    imgSpan.replaceChild(createImg("rem"), imgSpan.firstChild);
}

function remove(event) {
    blacklist = getBlacklist();
    var index = checkList(blacklist, userID)
    if (index >= 0) {
        var newBlacklist = new Array();
        for (var i = 0; i < blacklist.length; i++) {
            if (i != index) {
                newBlacklist.push(blacklist[i]);
            }
        }
        setBlacklist(newBlacklist);
    }
    imgSpan.replaceChild(createImg("add"), imgSpan.firstChild);
}

function getBlacklist() {
    var blacklistString = GM_getValue("blacklist");
    if (blacklistString != undefined && blacklistString.length > 0) {
        return blacklistString.split("|");
    } else {
        return new Array();
    }
}

function setBlacklist(list) {
    if (list != undefined && list.length > 0) {
        GM_setValue("blacklist", list.join("|"));
    } else {
        GM_setValue("blacklist", "");
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