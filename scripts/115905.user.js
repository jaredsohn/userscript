// ==UserScript==
// @name           Dörfer kopieren
// @description    Zeigt auf der kombinierten Uebersicht einen Link an, mit dessen Hilfe man alle Doerfer inclusive BB-Codes kriegt
// @include        http://*.die-staemme.de/game.php?*screen=overview_villages*mode=combined*
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.$.ajaxSetup({ cache: true });
win.$.getScript('http://scripts.die-staemme.de/gm-scripts/Doerfer_kopieren.js');