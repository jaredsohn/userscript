// ==UserScript==
// @name           Nexus War XP Counter
// @namespace      http://nw.abnormalcy.org/greasemonkey/
// @description    A GM script to show how much XP you need to level up on the characters page.
// @include        http://*nexuswar.com/characters/
// @include        http://*nexuswar.com/map/disconnect.do
// @include        http://*nexuswar.com/login.do
// ==/UserScript==
var levels = new Array();

levels[2] = 100;
levels[3] = 200;
levels[4] = 300;
levels[5] = 500;
levels[6] = 700;
levels[7] = 900;
levels[8] = 1200;
levels[9] = 1500;
levels[10] = 1800;
levels[11] = 2200;
levels[12] = 2600;
levels[13] = 3000;
levels[14] = 3500;
levels[15] = 4000;
levels[16] = 4500;
levels[17] = 5100;
levels[18] = 5700;
levels[19] = 6300;
levels[20] = 7000;
levels[21] = 7700;
levels[22] = 8400;
levels[23] = 9200;
levels[24] = 10000;
levels[25] = 10800;
levels[26] = 11700;
levels[27] = 12600;
levels[28] = 13500;
levels[29] = 14500;
levels[30] = 15500;

function calcXP() {    
    tr = document.getElementsByTagName("tr");
    
    for (var x = 0; x < tr.length; x++) {
        tr[x].innerHTML.match(/<td class=\"right\">(\d+)<\/td>((?:.|\n)*?)<td class=\"right\">(\d+)<\/td>/g);
        if (RegExp.$1 != 30) {
            var repstr = "<td class=\"right\">" + RegExp.$1 + "</td>" + RegExp.$2 + "<td class=\"right\">" + RegExp.$3 + " (-" + (levels[parseInt(RegExp.$1) + 1] - parseInt(RegExp.$3)) + ")</td>" + RegExp.$4;
            tr[x].innerHTML = tr[x].innerHTML.replace(/<td class=\"right\">(\d+)<\/td>(.|\n)*?<td class=\"right\">(\d+)<\/td>/g,repstr);
        }
    }
}

calcXP();

