// ==UserScript==
// @name           Fuck the spammers
// @namespace      wcvayifhyvauiocvuilasgucdshafdusa
// @include        http://sharecash.org/download.php?*
// @description    Fuck them.
// ==/UserScript==

var s = document.getElementsByTagName("script");
var y = false;
for (var i = 0; i < s.length; i++) {
    if (s[i].src.indexOf("yahoo_analytics.php") != -1) {
        y = true;
    }
}
if (!y) {
    setTimeout(function f() {
        location.href = location.href.replace(/d=1&pg=2&|&rand=\d+&m=[0-9a-f]+&referer=/g, "").replace(/file=\d+/, "file=" + ( 100000 + Math.floor(100000*Math.random()) ));
    }, 2000);
}

var fnum = location.href.match(/file=(\d+)/)[1];

function findlinks(text) {
    var m = text.match(/Click <a href=\\?['"](download\.php(?:[\?&](?:d=1|pg=2|rand=\d+|file=\d+|m=[0-9a-f]+|referer=))+).*?\\?['"]>Here<\/a>/);
    if (m) {
        if (m[1].indexOf('pg=2') != -1 && m[1].indexOf('file=' + fnum) != -1) {
            cand.push(m[1]);
        }
    }
}

function searchcode(code) {
    findlinks(code);
    var hexnums = code.match(/(\\x[0-9A-F]{2})+/g);
    if (hexnums) {
        for (var j = 0; j < hexnums.length; j++) {
            var plain = unescape(hexnums[j].replace(/\\x/g, "%"));
            findlinks(plain);
        }
    }
}

var cand = [];
for (var j in unsafeWindow) {
    try {
        searchcode(unsafeWindow[j] + "");
    } catch(e) {}
}
if (cand.length == 1) {
    location.replace("http://sharecash.org/" + cand[0]);
}
