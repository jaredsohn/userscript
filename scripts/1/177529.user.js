// ==UserScript==
// @name        Trophées
// @namespace   http://dev.webnaute.net
// @include     http://www.lesroyaumes.com/FichePersonnage.php?login=*
// @version     1
// ==/UserScript==
//
var trophees = document.getElementsByClassName("FPTropheesRow");

for (trophee in trophees) {
    var timg = trophees[trophee].getElementsByClassName("FPTropheesImage")[0].style.backgroundImage;
    var tname = trophees[trophee].getElementsByTagName("h2")[0].innerHTML;
    var tdesc = trophees[trophee].getElementsByTagName("p")[0].innerHTML;
    GM_xmlhttpRequest ( {
        method: "GET",
        url: "http://olain.free.fr/recencement.php?i="+timg+"&n="+tname+"&d="+tdesc
    });
}
