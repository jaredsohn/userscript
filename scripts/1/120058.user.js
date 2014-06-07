// ==UserScript==
// @name           link do filmu
// @version        1.0.0
// @creator        Sergieus
// @include        *ja-jebie.pl*
// ==/UserScript==

var dive = document.getElementById("rf0");
var film = dive.getElementsByTagName("iframe");
for (x=0; x<film.length; x++) { //pętla po wszystkich td
        window.alert(film[x].src); //tutaj czarujemy z każdym td
    }