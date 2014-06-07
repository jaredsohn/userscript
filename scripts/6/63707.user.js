// ==UserScript==
// @name           Sharecash survey bypasser
// @namespace      71f8f12556abe601d230ac099af2e207
// @include        http://sharecash.org/download.php?*
// @include        http://www.sharecash.org/download.php?*
// ==/UserScript==

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
