// ==UserScript==
// @name           DS Schnellleiste linksbuendig OldStyle
// @namespace      DS-Skripte by Merik
// @include        http://de*.die-staemme.de/game.php?*
// ==/UserScript==

var tr=document.getElementById('quickbar_inner').getElementsByTagName('tr')[1];
tr.getElementsByTagName('td')[1].style.textAlign='left';
var uls=tr.getElementsByTagName('ul');
for(var i=0;i<uls.length;i++) uls[i].style.textAlign='left';
var table = document.getElementById('quickbar_outer');
table.style.width = '750px';