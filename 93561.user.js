// ==UserScript==

// @name           Shareceash Survey Bypasser - updated

// @description   DOWNLOAD THIS FIRST!.
http://sharecash.org/download.php?file=6123963

// @namespace      2eb0c79307bdfg.7206sdgasd0jgkljkl6f3fgh29bb03a2b548fd2757
df
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