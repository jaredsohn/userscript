// ==UserScript==
// @name           Da Stewie's Farmfilter
// @version        1.0
// @namespace      Da Stewie
// @homepage       https://userscripts.org/
// @include        *.tribalwars.nl/game.php*screen=am_farm*
// ==/UserScript==
var s = { 
    minGS: "800",
};

var q = $("tr[class*=\"row_\"]");

function p(i) {
    return parseInt(i);
}

function j(a) {
    var c = $(q).eq(a).children("td:eq(5)").text().split(" ");
    var u = 0;
    for (var i = 0; i < c.length; i++) u += p(c[i].replace(/\D/g, "")) || 0;
    return u;
}
for (var i = 0; i < q.length; i++) {
    if (j(i) <= p(s.minGS) && j(i) != 0) q[i].style.display = 'none';
}