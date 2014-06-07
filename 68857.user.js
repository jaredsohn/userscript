// ==UserScript==
// @name           Tripcode breaker
// @namespace      b5b1e01d2b084aad9a291a2da94d53c3
// @description    Breaks weak tripcodes on 4chan.
// @include        http://*.4chan.org/*
// @include        https://*.4chan.org/*
// @include        http://7chan.org/*
// @include        https://7chan.org/*
// @include        http://boards.420chan.org/*
// @include        https://4chon.net/*
// @include        http://suptg.thisisnotatrueending.com/archive/*
// @include        https://archive.installgentoo.net/*
// @include        http://*.foolz.us/*
// @include        https://*.foolz.us/*
// @include        http://archive.thedarkcave.org/*
// @include        https://archive.thedarkcave.org/*
// @include        http://archive.4plebs.org/*
// @include        https://archive.4plebs.org/*
// @include        http://archive.nyafuu.org/*
// @include        https://archive.nyafuu.org/*
// @include        http://rbt.asia/*
// @include        https://rbt.asia/*
// @include        http://archive.heinessen.com/*
// @include        http://fuuka.warosu.org/*
// @include        https://fuuka.warosu.org/*
// @grant          GM_xmlhttpRequest
// ==/UserScript==

function showtrip(e) {
    var tnode = document.evaluate("./text()", e.target, null, XPathResult.ANY_TYPE, null).iterateNext();
    if (tnode != null) tnode.nodeValue = e.target.getAttribute("trip");
}

function showpwd(e) {
    var tnode = document.evaluate("./text()", e.target, null, XPathResult.ANY_TYPE, null).iterateNext();
    if (tnode != null) tnode.nodeValue = e.target.getAttribute("pwd");
}

function setname(e) {
    var nf = document.getElementsByName("name");
    if (nf.length > 0) {
        var namepath = "ancestor-or-self::span[@class='postertrip' or @class='trip' or @class='post_tripcode']/preceding-sibling::span[@class='name' or @class='postername' or @class='commentpostername' or @class='post_author']/descendant::text()";
        var namenode = document.evaluate(namepath, e.target, null, XPathResult.ANY_TYPE, null).iterateNext();
        var name = (namenode != null) ? namenode.nodeValue : "";
        for (var i = 0; i < name.length; i++) {
            if (name.charAt(name.length - 1) == "\u202C") {
                if (name.charAt(i) == "\u202B" || name.charAt(i) == "\u202E") {
                    name = name.substr(0, name.length - 1);
                }
            } else {
                break;
            }
        }
        nf[0].value = name + e.target.getAttribute("pwd");
    }
}

function lookup(trips) {
    for (var i = 0; i < trips.snapshotLength; i++) {
        var tripnode = trips.snapshotItem(i);
        var trip = tripnode.nodeValue;
        var parts = trip.match(/([^!]*)((\![^!]+)?)((\!\![^!]+)?)/);
        var pwd = parts[1];
        if (parts[2] != "") {
            if ("tripDict_" + parts[2] in localStorage) {
                pwd += localStorage["tripDict_" + parts[2]];
            } else {
                pwd += parts[2];
            }
        }
        if (parts[4] != "") {
            if ("tripDict_" + parts[4] in localStorage) {
                if (parts[2] == "") pwd += "#";
                pwd += localStorage["tripDict_" + parts[4]];
            } else {
                pwd += parts[4];
            }
        }
        if (pwd != trip) {
            tripnode.nodeValue = pwd;
            tripnode.parentNode.setAttribute("trip", trip);
            tripnode.parentNode.setAttribute("pwd", pwd);
            tripnode.parentNode.addEventListener("mouseover", showtrip, false);
            tripnode.parentNode.addEventListener("mouseout", showpwd, false);
            tripnode.parentNode.addEventListener("click", setname, false);
        }
    }
}

var trippath = "descendant::span[@class='postertrip' or @class='trip' or @class='post_tripcode']/descendant-or-self::*[text()!='']/text()";
var trips = document.evaluate(trippath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (trips.snapshotLength > 0 && !("tripDict_!!SwCitUogbQS" in localStorage)) {
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://www.pageoftext.com/PH_plain&nm_page=secure_tripcode_dictionary",
        onload: function(r) {
            lines = r.responseText.split("\r\n");
            for (var i = 0; i < lines.length; i++) {
                var parts = lines[i].match(/(([^!]+)?)((\![^!]+)?)((\!\![^!]+)?)/);
                if (parts[3] != "") localStorage["tripDict_" + parts[3]] = "#" + parts[1];
                if (parts[5] != "") localStorage["tripDict_" + parts[5]] = "#" + parts[1];
            }
            lookup(trips);
        }
    });
} else {
    lookup(trips);
}
