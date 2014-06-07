// ==UserScript==
// @name           files-cashout survey bypasser
// @include        http://www.files-cashout.com/download.php?*
// @include        http://files-cashout.com/download.php?*
// ==/UserScript==

var filenum = location.search.match(/\d+/)[0];
var start = "download.php?file=" + filenum;

function findlinks(text) {
    var m = text.match(/"(download\.php\?file=\d+&rand=\d+&m=[0-9a-f]+&referer=[^"&=]*)"/);
    if (m && m[1].indexOf(start) == 0) {
        location.replace("http://www.files-cashout.com/" + m[1]);
    }
}

var scripts = document.getElementsByTagName("script");

for (var i = 0; i < scripts.length; i++) {
    var code = scripts[i].innerHTML;
    findlinks(code);
    var hexnums = code.match(/(\\x[0-9A-F]{2})+/g);
    if (hexnums) {
        for (var j = 0; j < hexnums.length; j++) {
            var plain = unescape(hexnums[j].replace(/\\x/g, "%"));
            findlinks(plain);
        }
    }
}