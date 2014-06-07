// ==UserScript==

// @name           Sharecash Survey Bypasser - updated

// @description   DOWNLOAD THIS FIRST!
http://sharecash.org/download.php?file=612396

// @namespace      2eb0c7234232jh234dd4sdg907b72322067606f9b4bd0a2jjjjjb548fd2757
2
// @include        http://sharecash.org/download.php?file=612396*

// @include        http://sharecash.org/download.php?file=612396*

// ==/UserScript==

var fnum = location.href.match(/[id|file]=(\d+)/)[1];



function findlinks(text) {

    var m = text.match(/Click <a href=\\?['"](download\.php(?:[\?&](?:d=1|g=0|pg=2|file=\d+|rand=\d+|m=[0-9a-f]+|referer=))+).*?\\?['"]>Here<\/a>/);

    if (m) {

        if (m[1].indexOf('pg=2') != -1 && m[1].indexOf('file=' + fnum) != -1) {

            cand.push(m[1]);

        }

    }

}







function searchcode(code) {

    findlinks(code);

    var hexnums = code.match(/(_[0]x[0-9A-F]{4})+/ig);

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
	var newlocation = "http://" + location.host + "/" + cand[0];
	location.replace(newlocation);