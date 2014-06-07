// eBay Forum Thread Ignore List user script
// version 0.1.2
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
// @name          eBay Forum Thread Ignore List
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/7057
// @include       http://forums*.ebay.tld/*forum.jspa?*forumID=*
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
"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI" +
"WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QgXEhwUkJb95QAAAkRJREFUOMulk11IU3EYxp+zczyT" +
"5YXZItqyUlgUJUR0YV4E3UQRGemNF11ENxFGiFajCyHoYhisi11E2Qd609ASwq9FZQkKZUH2MQt1" +
"sw/G5tTVzpnb2c7H/+1iJXNOu+i5fX/vy///vM/LERFyteOo0y0KXDMvCCBGSGtGtkAMAHdjytfW" +
"kssLyNO0fwZnG0/hUM0+RGMy7g5MYJ3FjHQ8gvejw/n4ygEwDCRTCiwCQzK5iIySRHERgQz9zyuW" +
"y4QCIhAYEYgIhLVlwn9q5YASCwCuICyWWFZ64Dhy6X5gInAQGQ0QeYDn1iuKAsMwcv5E0DQVYKnT" +
"3LaTJ5DRAbMIx67KUcHEC1esWza/az5/xlZh34S0mkE8kYSm60v9jDGw4o1wtlwsazhcVXbB3Y+P" +
"r1+EOV5wmiYHXNGFSKyuzXNbicsyjlWXY7/DCoOxJUs1TcfOraXY67Ci9c5LvBr2pebn4nWTA66o" +
"CQDoW9eYFJHOXXW307O3IfC8gL/5YoygM8KB3TaMfZnDk8E+SklKIwW9Y8tMpB/dndHpkMd18wEi" +
"v9Iwi9mIaDpDzR47wBfhVucjpOYWPDTj7Si4BQr3NPnH/c+7BkdAxAMch9ISMyrtG3CvewiJWHiI" +
"vj9sWnuNUrL+cf/TwBt/EGKRGdVV5egb/oDZr58CFFus+2cOKNYvqwn1eHtHl6RqOmZCcXweH4nL" +
"UqaW5nvlfJ7Lv8alwvaGWnuFrUdRNfycXainoLe3ILfagOxpX24FgCnf9WurMb8BM/YSOUNqJt4A" +
"AAAASUVORK5CYII=";

const HIDPNG = "data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI" +
"WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QgXEiEqOx+o8AAAAixJREFUOMuV00toE1EUBuD/zExj" +
"Jp1kEvNq0hoT8jCVUHwQ40Y3PsBSqyg0bSpYu1AUKdiCqGApuBAVoRtxWwWXiuiiXSl04UZwJfii" +
"G23sRlJLmtdk7r0uBDE2aetZ3nv5OPznXBJCoFUljl29CQCfZ+/eavVGanVB4cH+So1NForVSYrl" +
"+v8LoMhg0uHRHl88N6QE4hnF49UeUWy4e1MAufscFrvl5YWRrK7ZLDC5QCi5z+l2qy/I2+/YuAO9" +
"/enJvqOxdCqKqlEDZ3Uoqo5gtCdm8TmerQtQ8PR0anfqcLb3AIgYTJNDCEAwE6orCE8wdIgi2emm" +
"AIUGzvrjXWPXL+UQcFlRM0wAvyckBIdgdXTGd8G3rWOMYrmRBoDC2Ywe0B9OTZynI+kuMGaCqLFV" +
"wQWIC4R27iev1/6AYkMZAKBE7zV/obDybvzyaDDS6UfVqOFnsYSAy4qF/DJm5j7AqVkhSAJJEiS5" +
"DaxWwdf389+dLucehTPz9o/FpcqNK1MLsMiATK5TAye2Dh8/+Fc4BGNlCd8+vS0Uy+ayWTYASYbu" +
"0O4oX+bujTYEmThzX1XVcVmWGwCSFJTqbTP1j08m1h/javlPeP+WsVrexCYKAc4BxjgMk6NmmDDq" +
"DCbjTd0mAGC3WtDhaUfIZ8feHX6kkwFYt8hAk4+nrDmRZQR8OpLb/fA4HVBtGnTNhnx+ESBpYyDe" +
"E8Xz2dd4Nf8GnANVgwEQKFUNxLvDa4BfNzK6un2Jkt0AAAAASUVORK5CYII=";

GM_registerMenuCommand("Manually purge local blacklist", purgeLocalList);
var threads = document.evaluate("//table[@summary = 'List of threads']/tbody/" +
    "tr", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var threadSubjects = document.evaluate("//a[@class = 'threadRowSubject']/@href",
    document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var threadIDs = new Array();
var params;
var param;
for (var i = 0; i < threadSubjects.snapshotLength; i++) {
    params = threadSubjects.snapshotItem(i).value.split("?")[1].split("&");
    for (var j = 0; j < params.length; j++) {
        param = params[j].split("=");
        if (param[0].toLowerCase() == "threadid") {
            threadIDs.push(param[1]);
        }
    }
}
var anchor = document.evaluate("//table[@summary = 'List of threads']/thead/" +
    "tr", document.body, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var domain = document.domain;
var blacklist = getLocalizedBlacklist(domain);
var blocked = new Array();
var switchPanel = document.createElement("th");
switchPanel.id = "switch";
switchPanel.setAttribute("style", "cursor: pointer;");
anchor.appendChild(switchPanel);
for (var i = 0; i < threads.snapshotLength; i++) {
    var panel = document.createElement("td");
    panel.id = "panel" + i;
    panel.setAttribute("style", "cursor: pointer;");
    if (searchList(blacklist, threadIDs[i]) < 0) {
        panel.appendChild(createImg("add", i));
    } else {
        threads.snapshotItem(i).style.display = "none";
        panel.appendChild(createImg("rem", i));
        blocked.push(i);
    }
    threads.snapshotItem(i).appendChild(panel);
}
if (blocked.length > 0) {
    switchPanel.appendChild(createImg("show", -1));
}
var lastTime = GM_getValue("time");
if (lastTime == null) {
    GM_setValue("time", (new Date()).getTime().toString());
} else {
    var newTime = (new Date()).getTime();
    if (newTime - lastTime > 3024000000) {
        purgeLocalList();
    }
}

function createImg(type, ID) {
    var img =  document.createElement("img");
    switch (type) {
        case "add":
            img.src = ADDPNG;
            img.title = "Add to blacklist";
            img.id = "add" + ID;
            img.setAttribute("style", "padding-left: 4px");
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
            img.setAttribute("style", "padding-left: 4px");
            img.addEventListener('click',
                function(event) {
                    remove(event);
                }, true
            );
            return img;
        case "show":
            img.src = SHOPNG;
            img.title = "Show all threads";
            img.setAttribute("style", "padding-left: 3px;");
            img.addEventListener('click',
                function(event) {
                    show(event);
                }, true
            );
            return img;
        case "hide":
            img.src = HIDPNG;
            img.title = "Hide blocked threads";
            img.setAttribute("style", "padding-left: 3px;");
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
    var temp = document.getElementById("switch");
    temp.replaceChild(createImg("hide", -1), temp.firstChild);
    for (var i = 0; i < blocked.length; i++) {
        threads.snapshotItem(blocked[i]).style.display = "";
    }
}

function hide(event) {
    var temp = document.getElementById("switch");
    temp.replaceChild(createImg("show", -1), temp.firstChild);
    update();
}

function add(event) {
    var ID = event.target.id.slice(3, event.target.id.length);
    var temp = document.getElementById("panel" + ID);
    threads.snapshotItem(ID).style.display = "none";
    addToLocalizedBlacklist(domain, threadIDs[ID]);
    blocked.push(ID);
    temp.replaceChild(createImg("rem", ID), temp.firstChild);
    temp = document.getElementById("switch");
    if (temp.firstChild) {
        temp.replaceChild(createImg("show", -1), temp.firstChild);
    } else {
        temp.appendChild(createImg("show", -1));
    }
}

function remove(event) {
    var ID = event.target.id.slice(3, event.target.id.length);
    var temp = document.getElementById("panel" + ID);
    temp.replaceChild(createImg("add", ID), temp.firstChild);
    removeFromLocalizedBlacklist(domain, threadIDs[ID]);
    var index = searchList(blocked, ID);
    if (index >= 0) {
        blocked.splice(index, 1);
        if (blocked.length == 0) {
            temp = document.getElementById("switch");
            temp.removeChild(temp.firstChild);    
        }
    }
}

function update() {
    blacklist = getLocalizedBlacklist(domain);
    var panel;
    blocked = new Array();
    for (var i = 0; i < threads.snapshotLength; i++) {
        panel = document.getElementById("panel" + i);
        if (searchList(blacklist, threadIDs[i]) < 0) {
            panel.replaceChild(createImg("add", i), panel.firstChild);
            threads.snapshotItem(i).style.display = "";
        } else {
            panel.replaceChild(createImg("rem", i), panel.firstChild);
            threads.snapshotItem(i).style.display = "none";
            blocked.push(i);
        }
    }
}

function purgeLocalList() {
    GM_setValue("time", (new Date()).getTime().toString());
    var blacklistString = GM_getValue("blacklist");
    if (blacklistString != undefined && blacklistString.length > 0) {
        var localizedBlacklists = blacklistString.split("|||");
        var localizedBlacklist;
        for (var i = 0; i < localizedBlacklists.length; i++) {
            localizedBlacklist = localizedBlacklists[i].split("||");
            if (localizedBlacklist[0] == domain) {
                var threadIDs = localizedBlacklist[1].split("|");
                var regExp = /\[[0-9]*\]/;
                var threadIDsToKill = new Array();
                var counter = 0;
                for (var j = 0; j < threadIDs.length; j++) {
                    var baseURL =
                        document.location.href.split("forum.jspa?")[0];
                    GM_xmlhttpRequest({
                        xhRThreadID: threadIDs[j],
                        xhRIndex: i,
                        xhRLBl: localizedBlacklist,
                        method: 'GET',
                        url: baseURL + 'thread.jspa?threadID=' + threadIDs[j],
                        onload: function(responseDetails) {
                            if (responseDetails.status == 200) {
                                var matches =
                                    regExp.exec(responseDetails.responseText);
                                if (matches) {
                		            threadIDsToKill.push(this.xhRThreadID);
                		        }
                            }
                            counter++;
                            if (counter == threadIDs.length) {
                                aftermath(localizedBlacklists, this.xhRIndex,
                                    this.xhRLBl, threadIDs,
                                    threadIDsToKill);
                            }
                        }
                    });
                }
            }
        }
    }
    
}

function aftermath(localizedBlacklists, localizedBlacklistsIndex,
    localizedBlacklist, threadIDs, threadIDsToKill) {
    if (threadIDsToKill.length > 0) {
        for (var i = 0; i < threadIDsToKill.length; i++) {
            threadIDs.splice(searchList(threadIDs, threadIDsToKill[i]), 1);
        }
        if (threadIDs.length > 0) {
            localizedBlacklist[1] = threadIDs.join("|");
            localizedBlacklists[localizedBlacklistsIndex] =
               localizedBlacklist[0] + "||" + localizedBlacklist[1];
            GM_setValue("blacklist", localizedBlacklists.join("|||"));
        } else {
            localizedBlacklists.splice(localizedBlacklistsIndex, 1);
            GM_setValue("blacklist", localizedBlacklists.join("|||"));
        }
    }
}

function getLocalizedBlacklist(domain) {
    var blacklistString = GM_getValue("blacklist");
    if (blacklistString != undefined && blacklistString.length > 0) {
        var localizedBlacklists = blacklistString.split("|||");
        var localizedBlacklist;
        for (var i = 0; i < localizedBlacklists.length; i++) {
            localizedBlacklist = localizedBlacklists[i].split("||");
            if (localizedBlacklist[0] == domain) {
                return localizedBlacklist[1].split("|");
            }
        }
        return new Array();
    } else {
        return new Array();
    }
}

function addToLocalizedBlacklist(domain, threadID) {
    if (domain != undefined && domain.length > 0 && threadID != undefined &&
        threadID.length > 0) {
        var blacklistString = GM_getValue("blacklist");
        if (blacklistString != undefined && blacklistString.length > 0) {
            var localizedBlacklists = blacklistString.split("|||");
            var localizedBlacklist;
            var threadList;
            var index;
            for (var i = 0; i < localizedBlacklists.length; i++) {
                localizedBlacklist = localizedBlacklists[i].split("||");
                if (localizedBlacklist[0] == domain) {
                    threadList = localizedBlacklist[1].split("|");
                    index = searchList(threadList, threadID);
                    if (index < 0) {
                        threadList.push(threadID);
                        localizedBlacklist[1] = threadList.join("|");
                        localizedBlacklists[i] = localizedBlacklist[0] + "||" +
                            localizedBlacklist[1];
                        GM_setValue("blacklist",
                            localizedBlacklists.join("|||"));
                        return;
                    }
                }
            }
            localizedBlacklists.push(domain + "||" + threadID);
            GM_setValue("blacklist", localizedBlacklists.join("|||"));
        } else {
            GM_setValue("blacklist", domain + "||" + threadID);
        }
    }
}

function removeFromLocalizedBlacklist(domain, threadID) {
    if (domain != undefined && domain.length > 0 && threadID != undefined &&
        threadID.length > 0) {
        var blacklistString = GM_getValue("blacklist");
        if (blacklistString != undefined && blacklistString.length > 0) {
            var localizedBlacklists = blacklistString.split("|||");
            var localizedBlacklist;
            var threadList;
            var index;
            for (var i = 0; i < localizedBlacklists.length; i++) {
                localizedBlacklist = localizedBlacklists[i].split("||");
                if (localizedBlacklist[0] == domain) {
                    threadList = localizedBlacklist[1].split("|");
                    index = searchList(threadList, threadID);
                    if (index >= 0) {
                        threadList.splice(index, 1);
                        if (threadList.length > 0) {
                            localizedBlacklist[1] = threadList.join("|");
                            localizedBlacklists[i] = localizedBlacklist[0] +
                                "||" + localizedBlacklist[1];
                            GM_setValue("blacklist",
                                localizedBlacklists.join("|||"));
                            return;
                        } else {
                            localizedBlacklists.splice(i, 1);
                            GM_setValue("blacklist",
                                localizedBlacklists.join("|||"));
                        }
                    }
                }
            }
        }
    }
}

function searchList(list, ID) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == ID) {
            return i;
        }
    }
    return -1;
}