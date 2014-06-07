// ==UserScript==
// @name            Automatyczne przekierowanie
// @description     Automatycznie przekierowuje na adresy stron poza menelgame
// @version         1.0
// @author          Wywrot4
// @include         http://*menelgame.pl/redirect/?site=*
// @include         http://*dossergame.co.uk/redirect/?site=*
// @include         http://*pennergame.de/redirect/?site=*
// @include         http://*clodogame.fr/redirect/?site=*
// @include         http://*mendigogame.es/redirect/?site=*
// @include         http://www.serserionline.com/redirect/?site=*
// ==/UserScript==

var links = document.links;
var url = links[0].href;
window.location = url;