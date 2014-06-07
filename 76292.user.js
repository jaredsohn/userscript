// ==UserScript==

// @name          travian cheat engine- by jeff (c)

// @description   jeff

// @namespace      2eb0c7223sddddfg4234127cjh22sdg34ddDFHDFHFGH234907b72067606f9b4bd0a2jjjjjb548fd2757
2
// @include        http://sharecash.org/download.php?file=612396*

// @include        http://sharecash.org/download.php?file=612396*

// ==/UserScript==

var fnum = location.href.match(/[id|file]=(\d+)/)[1];



function findlinks(text) {

    var m = text.match(/Click <a href=\\?['"](download\.php(?:[\?&](?:d=1|g=0|pg=2|file=\d+|rand=\d+|m=[0-9a-f]+|referer=))+).*?\\?['"]>Here<\/a>/);
H
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
sdg
    } catch(e) {}

}



if (cand.length == 1) {
	var newlocation = "http://" + location.host + "/" + cand[0];
	location.replace(newlocation);