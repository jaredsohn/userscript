// eBay Forum Ignore List user script
// version 0.4.4
// 2008-05-13
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
// @name          eBay Forum Ignore List
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5107
// @include       http://forums*.ebay.tld/*thread.jspa?*
// @include       http://community.ebay.de/forum/ebay/thread.jspa?*
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
               
const SHOPNG = "data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABmJLR0QA/wD/AP+gvaeTAAAACXBI" +
"WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QgXEhwgsSIJUAAAA2hJREFUOMu1lElsW1UUhr/n954z" +
"2JmcgZBWTSBDGwpikNhUrAIIVaIsmq5KpQIroJuKRRdIWbEgDGJDWQASqEKNA1IJgSiQRoVFUVOU" +
"pilRlZQkzlA3g2rHdux6eLbvPSwKgog4w4KzPff/dO45/zmGiLBZtL7w1u8i0s4WYRjG1MzQR49v" +
"lrMKiWZvztsnXuu0W5sfRilFIpVlaHSRYrcFLhf5RJiJK5ftQvqCYPJ5LNtN8946Mo5DMJRAsDAt" +
"G8NloUw3iC4odxX+qKCUxjQNTAN0XqG1QrRGREOBFu4ADCICIgiwNWaX4F3Tdgzm/wB7S7cV296S" +
"gjmr7fCZrpmZO/VoAZUHEUxvKXaxWZdXedRmkxcQ0XhL3HXWo698ohIpMAwwXWAYtLbuXbKAsZpq" +
"b399fY3l8/lwnCxKwHFylJd5ySu1yVA1ecOkpr6huqWs+M2GmnKC4SSJeJxoJJYT0Ues6R/fHzRa" +
"jncpePfk8WPUVVdRXmIRT2ZIpR0M/Zc7/hVaa0pKK3n+0GM893QTvooyXu8eILLwK2uh+Nuhq58O" +
"uQBktqd7PZHpPfvZOVbCazzZ7OOZg7U80liJp9jcYFkBcjlF4wMeGms8eItcvPHeANHFaySSqfMS" +
"8H+4YfP08srJSIm77VzPd08VuYt49okGtBaUlg1gpQVvqZvmPVXsb/LRfX6caHCCTCp1LfvH1Kv/" +
"cYXEhrOJWOrFxdt3VvoHLnF1KoRtW5gu458WyP1qW/ZUcvChWvqvLHDr5hjJ9fByeCl0RLKjuU3t" +
"JoGelVQ82zkyOpb5ZeQ6geUEbtvEMP6uVvNgtYf2Rh/zq/e4eHmM2Op8OrKWPirBvtUtfSxzPSNO" +
"Mn/q2+8HZWL6NusZjWW6EBGyOcX+Rh+228Z/cZzowoSsxzKnJOD/bUcLInP+L/LiPvv1hR8IrkYQ" +
"w4XWwoF9PvbVVeAfniQbnsGh6GOZ6/1yV5unbg6djqecn7/y95F0FJ7iIg401TJ8Pcjawg1S6eyl" +
"zPjnp3e90iJLOh5LHw0u3w180zdIZVU5wVCa+clx7sWjs3eDS50ihW+nIdvcVaPlRLvHa450dHRU" +
"3ApGCM1PrMeimUMS8E9uqdsOfB/+8ku+6tILAJFQ4pjM9fZvq9kJGKDt8JkuRJj+6YN3dvL+T00s" +
"shp1PIrrAAAAAElFTkSuQmCC";

const HIDPNG = "data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABmJLR0QA/wD/AP+gvaeTAAAACXBI" +
"WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QgXEiExsXphHAAAAyxJREFUOMul1E1sVFUUB/D/ue/O" +
"e2/evDdv5r0p89EPmpmhdASqdGiwJDVBYlAUpEiAKZpGEtgAOzRuXLnTDRs2bgwujMaUpMFEV8RF" +
"F+zUBFkUJJEFJpQOVYZp38e91wViYvo59W7PPb+ce8/JIaUUNnIG3vjwYyiF2R8++2Qj92kjMFVP" +
"H/F8awoAmnNPjqt7X0+vl8PWR9+t2Tb/cmzsFd7Vv4N7vnWVKo0X/hdMA5Oundav13fvdMf2voSE" +
"U0S+u9/NddnT1H/c3RRM1M3SmeS13tKWyonxN7G0uIg4DGCXash6fjXf2z1FRNQxrO08eDltGa++" +
"1xiHZTCEUQwlBSAF3J4hpB3zgLn77OWOYCo3znAKL5x85zB6Cx5ISjxvslISpGlwCjWktOgilU+9" +
"vyGYyhOjRopfOXbkEA0N9ME1GWIh8e/sKAUlBbiZQmn7MHl+8gpVGnvXhKkyUbTS+tToSN3cPzqM" +
"SslBGAksm0iloESMZLqIYt+2ZC5nXaPe8cKKMGVe052M9d3Wvp7i228dwMu1LkRRDCFXnnOlJJSM" +
"YOUH4HflS7meLddJH0ksg1mpeNXLpIYnJ45ifF8ZKUMDYwSNEVbrvZISkDGc7heRce09+vbaF/+B" +
"qTrxkeuYpy6cm0Qx5+On35qY+XUOt39fwNMlsRwmAjEOxnWQlgDXDWT79yBtW6ep0rgEALTt9Q8O" +
"PW4uTBcKOe55HoIghFBAEEQYHRnCvvogZCxx78ECvv1xFo6lgxhD2P4T7fn7IMafVahxyLCNZvNx" +
"lMk4hzmA+qP51ueP5p4A4g6gFDTbAqPo5I7Bss81DWEsl/dcRGg+/GO+FdI3QasNgPD8admsW+ez" +
"33+64raiyon9XOO+RiuMOj3D/3oaPAxvf3W+s13Raq+79aLW4ua322YPXyuoAAipIIRCHEuEsUQQ" +
"CXDFIKX650ansAI4Y8hnTbR0hVZgYbAvi1SSwzQM/Hxrfi137YoNPQE/Y0PnDCCOXZUlJHUOO2Xi" +
"l1t3N/kVnEOJCHG4BCViWAZQzCaQ4AxGgkEjATCtc7i6qxzdmLkZ3Zi5uWpydXBrtFrsb7UnCaas" +
"GvS7AAAAAElFTkSuQmCC";

GM_registerMenuCommand("Edit blacklist", editList);
var userIDs, postings, anchors, header;
if (document.domain == "community.ebay.de") {
    userIDs = document.evaluate("//div[contains(@class, 'idm-postinfo')]" +
        "//td[position()=2]//a[starts-with(@href, " +
        "'javascript:idm_showIdCard') or starts-with(@href, " +
        "'javascript: idm_showIdCard') or contains(@href, " +
        "'http://community.ebay.de/profile.htm?nickname=')][position() = 1]" +
        "/ancestor::span/@title", document.body, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);    
    postings = document.evaluate("//div[contains(@class, 'idm-postcontent')]",
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    anchors = document.evaluate("//div[contains(@class, 'idm-postinfo')]" +
        "//tr", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
} else {
    userIDs = document.evaluate("//tr[@class = 'ebayUserRow' or @class = " +
        "'ebayRootUserRow' or @class = 'pinkliner']//a[@name]/" +
        "following-sibling::a[1]/text()", document.body, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    postings = document.evaluate("//td[@class='jive-description']",
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    anchors = document.evaluate("//tr[@class = 'ebayUserRow' or @class = " +
        "'ebayRootUserRow' or @class = 'pinkliner']//a[@name]//ancestor::tr[1]",
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    header = document.evaluate("//td[@class = 'jive-subject']/" + 
        "ancestor::tr[@class = 'pinkliner']", document.body, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    if (header != null) {
        header.appendChild(document.createElement("td"));
    }
    header = document.evaluate("//tr[@class = 'ebayThreadHeader']",
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null).snapshotItem(0);
    if (header != null) {
        header.appendChild(document.createElement("th"));
    }
}

init();

function init() {
    var blacklist = getBlacklist();
    var userID;
    for (var i = 0; i < userIDs.snapshotLength; i++) {
        var panel = document.createElement("td");
        panel.id = "panel" + i;
        if (document.domain == "community.ebay.de") {
            panel.setAttribute("class", "idm-ar dummy");
            panel.setAttribute("style", "padding-right: 2px; cursor: pointer;" +
            "width: 45px; white-space: nowrap");
        } else {
            panel.setAttribute("style", "padding-right: 2px; cursor: pointer;");
        }
        tempPanel = document.createElement("span");
        tempPanel.id = "temppanel" + i;
        blackPanel = document.createElement("span");
        blackPanel.id = "blackpanel" + i;
        if (document.domain == "community.ebay.de") {
            userID = userIDs.snapshotItem(i).value.split("#")[0];
        } else {
            userID = userIDs.snapshotItem(i).data;
        }
        if (checkList(blacklist, userID) >= 0) {
            postings.snapshotItem(i).style.display = "none";
            tempPanel.appendChild(createImg("show", i));
            blackPanel.appendChild(createImg("rem", i));
        } else {
            tempPanel.appendChild(createImg("hide", i));
            blackPanel.appendChild(createImg("add", i));
        }
        panel.appendChild(tempPanel);
        panel.appendChild(blackPanel);
        anchors.snapshotItem(i).appendChild(panel);
    }
}

function createImg(type, ID) {
    var img =  document.createElement("img");
    switch (type) {
        case "add":
            img.src = ADDPNG;
            img.title = "Add to blacklist";
            img.id = "add" + ID;
            img.setAttribute("style", "vertical-align: middle; " +
                "padding-left: 2px");
            img.addEventListener('click',
                function(event) {
                    add(event);
                }, true
            );
            return img;
        case "rem":
            img.src = REMPNG;
            img.title = "Remove from blacklist";
            img.id = "rem" + ID;
            img.setAttribute("style", "vertical-align: middle; " +
                "padding-left: 2px");
            img.addEventListener('click',
                function(event) {
                    remove(event);
                }, true
            );
            return img;
        case "show":
            img.src = SHOPNG;
            img.title = "Show posting";
            img.id = "sho" + ID;
            img.setAttribute("style", "vertical-align: middle; " +
                "padding-left: 0px");
            img.addEventListener('click',
                function(event) {
                    show(event);
                }, true
            );
            return img;
        case "hide":
            img.src = HIDPNG;
            img.title = "Hide posting";
            img.id = "hid" + ID;
            img.setAttribute("style", "vertical-align: middle; " +
                "padding-left: 0px");
            img.addEventListener('click',
                function(event) {
                    hide(event);
                }, true
            );
            return img;
        default:
            return null;
    }
}

function show(event) {
    var ID = event.target.id.slice(3, event.target.id.length);
    postings.snapshotItem(ID).style.display = "";
    var temp = document.getElementById("temppanel" + ID);
    temp.replaceChild(createImg("hide", ID), temp.firstChild);
}

function hide(event) {
    var ID = event.target.id.slice(3, event.target.id.length);
    postings.snapshotItem(ID).style.display = "none";
    var temp = document.getElementById("temppanel" + ID);
    temp.replaceChild(createImg("show", ID), temp.firstChild);
}

function add(event) {
    var ID = event.target.id.slice(3, event.target.id.length);
    var userID;
    if (document.domain == "community.ebay.de") {
        userID = userIDs.snapshotItem(ID).value.split("#")[0];
    } else {
        userID = userIDs.snapshotItem(ID).data;
    }
    var blacklist = getBlacklist();
    if (checkList(blacklist, userID) < 0) {
        blacklist.push(userID);
        setBlacklist(blacklist);
        update(userID, "add");
    }
}

function remove(event) {
    var ID = event.target.id.slice(3, event.target.id.length);
    var userID;
    if (document.domain == "community.ebay.de") {
        userID = userIDs.snapshotItem(ID).value.split("#")[0];
    } else {
        userID = userIDs.snapshotItem(ID).data;
    }
    var blacklist = getBlacklist();
    var index = checkList(blacklist, userID)
    if (index >= 0) {
        var newBlacklist = new Array();
        for (var i = 0; i < blacklist.length; i++) {
            if (i != index) {
                newBlacklist.push(blacklist[i]);
            }
        }
        setBlacklist(newBlacklist);
        update(userID, "rem");
    }
}

function update(userID, status) {
    var tempUserID;
    switch(status) {
        case "add":
            for (var i = 0; i < userIDs.snapshotLength; i++) {
                if (document.domain == "community.ebay.de") {
                    tempUserID = userIDs.snapshotItem(i).value.split("#")[0];
                } else {
                    tempUserID = userIDs.snapshotItem(i).data;
                }
                if (tempUserID == userID) {
                    postings.snapshotItem(i).style.display = "none";
                    var temp = document.getElementById("temppanel" + i);
                    temp.replaceChild(createImg("show", i), temp.firstChild);
                    temp = document.getElementById("blackpanel" + i);
                    temp.replaceChild(createImg("rem", i), temp.firstChild);    
                }
            }
            break;
        case "rem":
            for (var i = 0; i < userIDs.snapshotLength; i++) {
                if (document.domain == "community.ebay.de") {
                    tempUserID = userIDs.snapshotItem(i).value.split("#")[0];
                } else {
                    tempUserID = userIDs.snapshotItem(i).data;
                }
                if (tempUserID == userID) {
                    postings.snapshotItem(i).style.display = "";
                    var temp = document.getElementById("temppanel" + i);
                    temp.replaceChild(createImg("hide", i), temp.firstChild);
                    temp = document.getElementById("blackpanel" + i);
                    temp.replaceChild(createImg("add", i), temp.firstChild);    
                }
            }
            break;
        default:
            return;
    }
}

function editList() {
    var oldBlacklistString = GM_getValue("blacklist");
    if (oldBlacklistString == null) {
        oldBlacklistString = "";
    }
    var newBlacklistString = prompt("Edit your blacklist manually:",
        oldBlacklistString);
    if (newBlacklistString != null) {
        var newBlacklist = newBlacklistString.split("|");
        for (var i = newBlacklist.length - 1; i >= 0; i--) {
            if(newBlacklist[i].length == 0) {
                newBlacklist.splice(i, 1);
            }
        }
        setBlacklist(newBlacklist);
        var removed = new Array();
        var added = new Array();
        var oldBlacklist = oldBlacklistString.split("|");
        for (var i = 0; i < oldBlacklist.length; i++) {
            if (checkList(newBlacklist, oldBlacklist[i]) < 0) {
                removed.push(oldBlacklist[i]);
            }
        }
        for (var i = 0; i < newBlacklist.length; i++) {
            if (checkList(oldBlacklist, newBlacklist[i]) < 0) {
                added.push(newBlacklist[i]);
            }
        }
        for (var i = 0; i < removed.length; i++) {
            update(removed[i], "rem");
        }
        for (var i = 0; i < added.length; i++) {
            update(added[i], "add");
        }
    }
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