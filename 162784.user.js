// ==UserScript==
// @name        Wykopbay
// @description Podmienia Gry na Zatokę
// @include     http://wykop.pl/
// ==/UserScript==

if (window.location.hostname === "gry.wykop.pl") {
 window.location = "http://thepiratebay.se"
}
 