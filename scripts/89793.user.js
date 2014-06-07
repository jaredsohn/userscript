// ==UserScript==
// @name           MaxLaufzeitMarktplatz
// @namespace      Marktplatz: Maximale Laufzeit Standart festlegen
// @description    Im Script kann man die maximale Laufzeit für den Marktplatz Einene Angebote festlegen
// @include        http://*.die-staemme.de/game.php?*&screen=market&mode=own_offer*
// ==/UserScript==
document.getElementsByName('max_time')[0].value='10'