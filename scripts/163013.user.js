// ==UserScript==
// @name        Kampfstatistik ausblenden
// @namespace   Herzfinsternis
// @description Blendet die Kampfstatistik aus. Zum Einblenden muss das Script deaktiviert werden.
// @include     http://*.pennergame.de/fight/*
// @grant       none
// @version     0.1
// ==/UserScript==

document.getElementById('chart_div').style.display='none';
document.getElementById('text_div').parentNode.parentNode.style.display='none';
document.getElementById('hide').parentNode.parentNode.style.display='none';
document.getElementById('tab_div').parentNode.parentNode.style.display='none';
