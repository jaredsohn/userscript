// ==UserScript==
// @name           Bauschleife schalten
// @description    Zeigt bzw. versteckt die Bauschleife, wenn mehr als 3 auftraege in Arbeit sind
// @include        http://*.die-staemme.de/game.php?*screen=main*
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.$.ajaxSetup({ cache: true });
win.$.getScript('http://scripts.die-staemme.de/gm-scripts/Bauschleife_schalten.js');