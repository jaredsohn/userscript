// ==UserScript==
// @name           Tripcode titles
// @namespace      http://userscripts.org/users/77660
// @include        http://*.4chan.org/*
// @include        http://7chan.org/*
// @include        http://boards.420chan.org/*
// @include        http://www.711chan.org/*
// @include        http://*chanarchive.org/*
// @include        http://suptg.thisisnotatrueending.com/archive/*
// @include        http://archive.easymodo.net/cgi-board.pl/*
// @include        http://green-oval.net/cgi-board.pl/*
// @include        http://archive.no-ip.org/*
// @include        https://md401.homelinux.net/4chan/cgi-board.pl/*
// @description    Converts tripcodes into adjectives, making imposters easy to recognize.
// @require        http://crypto-js.googlecode.com/files/2.2.0-crypto-sha256.js
// @resource       wordlist_raw http://www.pageoftext.com/PH_plain&nm_page=adjectives_trip
// ==/UserScript==

function set_pwd() {
    pwd = prompt("Enter password for tripcode titles.\nThe adjectives generated depend on the password you choose.", GM_getValue("trip_title_password", ""));
    if (typeof(pwd) == "string") GM_setValue("trip_title_password", pwd);
}

function get_title(trip) {
    var hash = Crypto.SHA256(trip, {asBytes: true});
    var n = hash[0]*0x10000 + hash[1]*0x100 + hash[2];
    return wordlist[n % wordlist.length];
}

GM_registerMenuCommand("Set tripcode titles password", set_pwd);

var pwd = GM_getValue("trip_title_password", "");
if (pwd == "") {
    set_pwd();
    pwd = GM_getValue("trip_title_password", "");
}

if (pwd != "") {
    var wordlist = GM_getResourceText("wordlist_raw").split(" ");
    var trippath = "descendant::span[@class='postertrip']/descendant-or-self::*[text()!='']/text()";
    var trips = document.evaluate(trippath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < trips.snapshotLength; i++) {
        var tripnode = trips.snapshotItem(i);
        var trip = tripnode.nodeValue;
        var parts = trip.match(/[^!]*((\![^!]+)?)((\!\![^!]+)?)/);
        var title = " the";
        if (parts[1] != "") {
            title += " " + get_title(pwd+parts[1]);
        }
        if (parts[3] != "") {
            title += " " + get_title(pwd+parts[3]);
        }
        if (parts[1] != "" || parts[3] != "") {
            var titleNode = document.createElement("b");
            titleNode.innerHTML = title;
            tripnode.parentNode.insertBefore(titleNode, tripnode.nextSibling);
        }
    }
}
