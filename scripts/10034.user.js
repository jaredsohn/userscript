// eBay Blog Blocker user script
// Version 0.4
// 2007-15-06
// Copyright (c) 2007, thorbenhauer
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
// With contributions by *ankafeur* and mikgrosch
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
// @name          eBay Blog Blocker
// @namespace     http://freenet-homepage.de/hackimag/userscripts/
// @description   http://userscripts.org/scripts/show/10034
// @include       http://blogs.ebay.tld/
// @include       http://search.blogs.ebay.tld/*
// @include       http://blogs.ebay.tld/*/entry/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () {
const removeComplete = false;
GM_registerMenuCommand("Edit blacklist", editBlackList);
GM_registerMenuCommand("Edit killfile", editKillFile);
GM_registerMenuCommand("Set pages", editPages);
var blacklist = getList("blacklist");
var killfile = getList("killfile");
var pages = getPages();
var tld = document.domain.split(".ebay.")[1];
var comments = false;
if (document.location.href.match(/\/entry\//)) {
    comments = true;
}
var entries;
if (document.location.href == 'http://blogs.ebay.' + tld + '/' && pages > 0) {
    scrap(pages);
} else {
    for (var i = 0; i < blacklist.length; i++) {
        init(blacklist[i], false);
    }
    for (var i = 0; i < killfile.length; i++) {
        init(killfile[i], true);
    }
}

function init(name, kill) {
    var tempNode, divs;
    divs = getDivs(name);
    for (var i = 0; i < divs.length; i++) {
        tempNode = divs[i];
        if (kill) {
            tempNode.style.display = "none";
        } else {
            addClickDiv(tempNode, name);
            switchView(tempNode, "none", kill);
        }
    }
}

function getDivs(name) {
    var divs;
    if (comments) {
        divs = document.evaluate("//td[@class='commentstab']//" +
        "a[starts-with(@href, 'http://blogs.ebay." + tld + "/" + name +
        "')]//ancestor::div[@class = 'insideframeyukon']/div|" +
        "//td[@class='commentstab']//a[starts-with(@href, 'http://blogs.ebay." +
        tld + "/" + name + "')]//ancestor::div[@class = 'frameContent']",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    } else {
        divs = document.evaluate("//a[starts-with(@href," +
        "'http://blogs.ebay." + tld + "/" + name + "')]//" +
        "ancestor::div[contains(@class, 'innerDiv') or contains(@class, " +
        "'innerfirstDiv') or contains(@class, 'innerlastDiv') or " +
        "contains(@class, 'resultcontentdiv') or contains(@class, " +
        "'resultcontentdivlast')]", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    var result = new Array();
    for (var i = 0; i < divs.snapshotLength; i++) {
        result.push(divs.snapshotItem(i));
    }
    return result;
}

function switchView(node, display, kill) {
    if (kill) {
        node.style.display = display;
    } else {
        var clickDiv = document.evaluate("./div[@class='clickdiv']",
            node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0);
        var entry;
        if (comments) {
            entry = document.evaluate("./table[@class='commentstable']",
                node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null).snapshotItem(0);
        } else {
            entry = document.evaluate("./div[@class!='clickdiv']",
            node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0); 
        }
        if (display == "none") {
            if (!comments) {
                node.style.paddingTop = '1px';
                node.style.paddingBottom = '1px';
            }
            clickDiv.style.display = "";
            entry.style.display = "none";
        } else {
            if (!comments) {
                node.style.paddingTop = '10px';
                node.style.paddingBottom = '15px';
            }
            clickDiv.style.display = "none";
            entry.style.display = "";
        }
    }
}

function addClickDiv(node, name) {
    var entry;
    if (comments) {
        entry = document.evaluate("./table[@class='commentstable']",
            node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0);
    } else {
        entry = document.evaluate("./div[@class!='clickdiv']",
        node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null).snapshotItem(0); 
    }
    entry.style.cursor = 'pointer';
    entry.addEventListener('click', function (event) {
        switchView(node, "none");
        }, false);
    var clickDiv = document.createElement("div");
    clickDiv.setAttribute("class", "clickdiv");
    clickDiv.innerHTML = name + ' >> ' + getSubject(node, name); 
    //clickDiv.style.backgroundColor = '#FFFFFF';
    clickDiv.style.color = '#666666';
    clickDiv.style.fontSize = '5px';
    clickDiv.style.cursor = 'pointer';
    node.appendChild(clickDiv);
    clickDiv.addEventListener("click", function (event) {
        switchView(event.target.parentNode, "");
        }, false);  
}

function removeClickDiv(node) {
    var entry;
    if (comments) {
        entry = document.evaluate("./table[@class='commentstable']",
            node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0);
    } else {
        entry = document.evaluate("./div[@class!='clickdiv']",
        node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null).snapshotItem(0); 
    }
    entry.style.cursor = '';
    var clickDiv = document.evaluate("./div[@class='clickdiv']",
            node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0);
    node.removeChild(clickDiv);
}

function getSubject(node, name) {
    if (comments) {
        return "";
    }
    var result = 'unknown subject';
    if (!node) {
        return result;
    }
    var anchor = document.evaluate(".//a[starts-with(@href," +
        "'http://blogs.ebay." + tld + "/" + name + "')]", node, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    result = anchor.innerHTML;
    return result;
};

function scrap(pages) {
    entries = new Array(pages);
    for (var i = 0; i < pages; i++) {
        scrapPage(i, entries);
    }
}

function scrapPage(count, container) {
    var regExp = /<div class="resultcontent[^>]+><div[^>]+><div><div[^>]+><a[^>]+><img[^>]+><\/a><\/div><div><span><span><a[^>]+>[^<]+<\/a><\/span><\/span><div[^>]+>[^<]+<div[^>]+><a[^>]+>[^<]+<\/a>[^<]+<a[^>]+>[^<]+<\/a>(<img[^>]+>)?[^<]+(<a[^>]+><img[^>]+><\/a>)?(<a[^>]+><img[^>]+><\/a>)?<\/div><\/div><div[^>]+>[^<]+<\/div><div[^>]+><a[^>]+>[^<]+<\/a><\/div><\/div><\/div><\/div><\/div>/ig;
    GM_xmlhttpRequest({
        method: "GET",
        result: container,
        url: "http://search.blogs.ebay." + tld + "/_W0QQfindZ3231QQpageZ" +
            (count + 2) + "QQsearch_typeZposts",
        onload:function(details) {
            var matches = details.responseText.match(regExp);
            this.result[count] = matches;
            var empty = false;
            for (i = 0; i < this.result.length; i++) {
                if (this.result[i] == null) {
                    empty = true;
                }
            }
            if (!empty) {
                aftermath();
            }
        }
    });
}

function aftermath() {
    var anchors, anchor, parent, div, matches, time;
    var regExp = /<div class="resultcontent[^>]+><div[^>]+><div><div[^>]+>(<a[^>]+><img[^>]+><\/a>)<\/div><div><span><span>(<a[^>]+>[^<]+<\/a>)<\/span><\/span><div[^>]+>([^<]+)<div[^>]+><a[^>]+>[^<]+<\/a>[^<]+<a[^>]+>[^<]+<\/a>(<img[^>]+>)?[^<]+(<a[^>]+><img[^>]+><\/a>)?(<a[^>]+><img[^>]+><\/a>)?<\/div><\/div><div[^>]+>([^<]+)<\/div><div[^>]+>(<a[^>]+>[^<]+<\/a>)<\/div><\/div><\/div><\/div><\/div>/i;
    GM_addStyle(".import {white-space: normal}");
    anchor = document.evaluate("//div[@class='innerlastDiv']", document.body,
        null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    anchor.setAttribute("class", "innerDiv");
    anchor = document.evaluate("//div[@id='CentralArea']//" + 
        "div[@class='bottombar']", document.body, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    parent = anchor.parentNode;
    for (var i = 0; i < entries.length; i++) {
        for (var j = 0; j < entries[i].length; j++) {
            div = document.createElement("div");
            div.setAttribute("class", "innerDiv");
            matches = entries[i][j].match(regExp);
            div.innerHTML = '<div class="lrentry lrentry-first"><div ' +
                'class="outerdivcont"><table><tr><td class="imagecol"><div>' +
                matches[1] + '</div></td><td class="blogcol" align="top">' +
                '<div class="blogdivcont" style="word-break:break-all;"><div>' +
                '<b class="import">' + matches[2] + '</b></div><div><span>in ' +
                matches[8] + '</span><span class="lrentry-time import">(' +
                matches[3] + ')</span><img src="http://pics.ebaystatic.com/aw' +
                '/pics/de/s.gif" width="3"><span class="lrentry import">' +
                matches[7] + '</span></div></div></td><td class="commentscol" ' +
                'style="visibility:hidden"><div class="commentdiv">&nbsp</div>' +
                '</td></tr></table></div></div>';
            parent.insertBefore(div, anchor);
        }
    }
    anchor.previousSibling.setAttribute("class", "innerlastDiv");
    anchors = document.evaluate("//b[@class='import']/a", document.body, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < anchors.snapshotLength; i++) {
        if (anchors.snapshotItem(i).innerHTML.length > 40) {
            anchors.snapshotItem(i).innerHTML =
                anchors.snapshotItem(i).innerHTML.substr(0, 40) + "...";
        }
    }
    anchors = document.evaluate("//span[contains(@class, 'import') and " +
        "starts-with(@class, 'lrentry')]", document.body, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < anchors.snapshotLength; i++) {
        if (anchors.snapshotItem(i).innerHTML.length > 80) {
            anchors.snapshotItem(i).innerHTML =
                anchors.snapshotItem(i).innerHTML.substr(0, 80) + "...";
        }
    }
    
    anchors = document.evaluate("//span[contains(@class, 'import') and " +
        "starts-with(@class, 'lrentry-time')]", document.body, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < anchors.snapshotLength; i++) {
        time = anchors.snapshotItem(i).innerHTML.split(" ");
        time.splice(3, 2);
        anchors.snapshotItem(i).innerHTML = time.join(" ") + ')';
    }
    for (var i = 0; i < blacklist.length; i++) {
        init(blacklist[i], false);
    }
    for (var i = 0; i < killfile.length; i++) {
        init(killfile[i], true);
    }
}

function getList(listname) {
    var listString = GM_getValue(listname);
    var result = new Array();
    if (listString != undefined && listString.length > 0) {

        // Convert deprecated blacklist to new format
        var deprecatedBlacklist = listString.split('|');
        if (deprecatedBlacklist.length > 1) {
            setList("blacklist", deprecatedBlacklist);
            return deprecatedBlacklist;
        }
        
        var list = listString.split(' ');
        for (var i = 0; i < list.length; i++) {
            if (list[i].length > 0) {
	            result[result.length] = list[i];
            }
	    }
    }
    return result;
}

function getPages() {
    var pages = GM_getValue("pages");
    if (pages != undefined) {
        if (pages >= 0 && pages < 6) {
            return pages;
        } else {
            return 3;
        }
    } else {
        GM_setValue("pages", 3);
        return 3;
    }
}

function editPages() {
    var oldPages = getPages();
    var newPagesString = prompt("Set amount of pages to fetch:", oldPages);
    if (newPagesString != null) {
        var newPages = parseInt(newPagesString);
        if (newPages >= 0 && newPages < 6) {
            GM_setValue("pages", newPages);
        } else {
            GM_setValue("pages", 3);
        }
    }
}

function editBlackList() {
    editList("blacklist");
}

function editKillFile() {
    editList("killfile");
}

function editList(listname) {
    var oldList = getList(listname);
    var newListString = prompt("Edit your " + listname + " manually:",
        oldList.join(" "));
    if (newListString != null) {
        var newList = newListString.split(" ");
        for (var i = newList.length - 1; i >= 0; i--) {
            if(newList[i].length == 0) {
                newList.splice(i, 1);
            }
        }
        setList(listname, newList);
        var removed = new Array();
        var added = new Array();
        for (var i = 0; i < oldList.length; i++) {
            if (checkList(newList, oldList[i]) < 0) {
                removed.push(oldList[i]);
            }
        }
        for (var i = 0; i < newList.length; i++) {
            if (checkList(oldList, newList[i]) < 0) {
                added.push(newList[i]);
            }
        }
        var divs;
        for (var i = 0; i < removed.length; i++) {
            divs = getDivs(removed[i]);
            for (var i = 0; i < divs.length; i++) {
                if (listname == "killfile") {
                    switchView(divs[i], "", true);
                }
                if (listname == "blacklist") {
                    switchView(divs[i], "", false);
                    removeClickDiv(divs[i]);
                }
            }
        }
        for (var i = 0; i < added.length; i++) {
            divs = getDivs(added[i]);
            var name = added[i];
            for (var i = 0; i < divs.length; i++) {
                if (listname == "killfile") {
                    switchView(divs[i], "none", true);
                }
                if (listname == "blacklist") {
                    addClickDiv(divs[i], name);
                    switchView(divs[i], "none", false);
                }
            }
        }
    }
}

function setList(listname, list) {
    if (list != undefined && list.length > 0) {
        GM_setValue(listname, list.join(" "));
    } else {
        GM_setValue(listname, "");
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

})();
