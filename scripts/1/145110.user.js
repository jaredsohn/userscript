// ==UserScript==

// @name           Sharecash Survey Byser - updated

// @description    Updated version of Shareh Survey Bypasser. All credit goes to orginal author spamcash

// @namespace      2eb0c7907b720606f9bb0ab548fd2757

// @include        http://fileice.net/download.php?*

// @include        http://fileice.net/download.php?*

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


}