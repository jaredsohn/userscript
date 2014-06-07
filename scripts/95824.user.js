// ==UserScript==
// @name           DS Schnellleiste linksbuendig
// @namespace      DS-Skripte by Merik
// @include        http://de*.die-staemme.de/game.php?*
// ==/UserScript==

var tr=document.getElementById('quickbar_inner').getElementsByTagName('tr')[1];
tr.getElementsByTagName('td')[1].style.textAlign='left';
var table = document.getElementById('quickbar_outer');
table.style.width = '750px';