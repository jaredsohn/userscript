// ==UserScript==
// @name           Tripcode breaker
// @namespace      b5b1e01d2b084aad9a291a2da94d53c3
// @description    Breaks weak tripcodes on Minichan.
// @include        http://minichan.org/*
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
        var namepath = "ancestor-or-self::span[@class='postertrip']/preceding-sibling::span[@class='postername' or @class='commentpostername']/descendant::text()";
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
        var parts = trip.match(/((\![^!]+)?)((\!\![^!]+)?)/);
        var pwd = "";
        if (parts[1] != "") {
            pwd += GM_getValue(parts[1], parts[1]);
        }
        if (parts[3] != "") {
            var stp = GM_getValue(parts[3], "");
            if (stp != "") {
                if (parts[1] == "") pwd += "#";
                pwd += stp;
            } else {
                pwd += parts[3];
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

var trippath = "descendant::span[@class='postertrip']/descendant-or-self::*[text()!='']/text()";
var trips = document.evaluate(trippath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (trips.snapshotLength > 0 && GM_getValue("!!SwCitUogbQS", "") == "") {
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://www.pageoftext.com/PH_plain&nm_page=secure_tripcode_dictionary",
        onload: function(r) {
            lines = r.responseText.split("\r\n");
            for (var i = 0; i < lines.length; i++) {
                var parts = lines[i].match(/(([^!]+)?)((\![^!]+)?)((\!\![^!]+)?)/);
                if (parts[3] != "") GM_setValue(parts[3], "#" + parts[1]);
                if (parts[5] != "") GM_setValue(parts[5], "#" + parts[1]);
            }
            lookup(trips);
        }
    });
} else {
    lookup(trips);
}