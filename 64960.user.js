// JavaScript Document
// ==UserScript==
// @name Login Startseiten ueberspringer by Basti1012 pennergame dossergame menelgame clodogame menigogame
// @namespace basti1012[http://pennerhack.foren-city.de]
// @description Ueberspringt Pennergame-loginseite.Der neue login wird uebersprungen und man gelangt zur pennergame/login/ seite wo die neuen grafiken nicht megr sind .Pennergame dossergame menelgame clodogame mendigogame
// @include *pennergame.de/
// @include *pennergame.de/logout/

// @include *dossergame.co.uk/
// @include *dossergame.co.uk/logout/

// @include *menelgame.pl/
// @include *menelgame.pl/logout/

// @include *clodogame.fr/
// @include *clodogame.fr/logout/

// @include *mendigogame.es/
// @include *mendigogame.es/logout/


// @include *sevenload.de*
// ==/UserScript==

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
window.location.href = "http://berlin.pennergame.de/login/";
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
window.location.href = "http://dossergame.co.uk/login/";
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
window.location.href = "http://www.pennergame.de/login/";
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
window.location.href = "http://menelgame.pl/login/";
}
else if(document.location.href.indexOf('clodogame.fr/')>=0) {
window.location.href = "http://clodogame.fr/login/";
}
else if(document.location.href.indexOf('mendigogame.es/')>=0) {
window.location.href = "http://mendigogame.es/login/";
}
else if(document.location.href.indexOf('sevenload.de/')>=0) {
window.location.href = "http://pennergame.de/login/";
};