// ==UserScript==
// @name           Bit-book idézet nélkül
// @description    Törli az oldal tetején lévő idézetet
// @author         Your Name
// @include        http://bit-book.ath.cx/*
// @version        1.0
// ==/UserScript==


mo = document.getElementsByClassName('mainouter')[0]
if (mo) {
    delme = mo.getElementsByTagName('p')[0]
    delme.parentNode.removeChild(delme)
}
