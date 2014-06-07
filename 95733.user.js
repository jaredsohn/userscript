// ==UserScript==
// @name           db-lynx-reisedauer
// @namespace      Oliver Prygotzki
// @description    Ergänzt Text-Fahrplanauskunft DB um die Reisedauer
// @include        http://reiseauskunft.bahn.de/bin/query.exe/dl*
// @include        http://reiseauskunft.bahn.de/bin/query2.exe/dl*
// @copyright      Oliver Prygotzki
// @version        1.0
// @license        Creative Commons Attribution-Noncommercial 3.0 Germany License
// ==/UserScript==

(function($) {

function timediff(h1, m1, h2, m2)
{
    m1 *= 1; h1 *= 1; m2 *= 1; h2 *= 1;
    var dep = (60 * h1) + m1;
    var arr = (60 * h2) + m2;
    if (arr < dep) {
       arr += 24*60;
    }

    var min = (arr-dep);
    var m = min % 60;
    if (m < 10) {
       m = '0'+m;
    }
    var h = Math.floor(min / 60);
    return(h+':'+m);
}

if (/Fahrplanauskunft Übersicht/.test(document.body.innerHTML)) {

    var pre = document.getElementsByTagName('pre')[0];
    pre.innerHTML = pre.innerHTML.replace(/(\d+):(\d+)\s+\|\s+(\d+):(\d+)\s+\|/mg, function(m, h1, m1, h2, m2) {
         return m + ' (' + timediff(h1, m1, h2, m2) + ')';
    });

}

})();
