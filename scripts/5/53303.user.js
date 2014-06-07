// ==UserScript==
// @name DS - Spielerbashverlauf
// @namespace none
// @include http://*.staemme.ch/game.php?*village=*&screen=info_player&id=*
// @include http://*.die-staemme.de/game.php?*village=*&screen=info_player&id=*
// ==/UserScript==

(
function() {
var f=document;
var i,l,m,s,td,tr,img,a;
var srv=0;
try {
srv=f.location.href.match(/ch(\d+)\D*\.staemme\./)[1];
} catch (e) {
return;
}
for (i=0;i<f.links.length;i++) {
l=f.links[i];
if (l.href.search(/village=[0-9]+&screen=mail&mode=new&player=([0-9]+)/) > -1) {
m=l.href.match(/village=[0-9]+&screen=mail&mode=new&player=([0-9]+)/)[1];
s=l.parentNode.parentNode;

tr=f.createElement('tr');
td=f.createElement('td');
td.colSpan=2;
a=f.createElement('a');
a.target='dsreal';
a.href='http://www.dsreal.de/index.php?tool=akte&mode=player_conquer&world=ch'+srv+'&id='+m;
img=f.createElement('img');
img.src='http://www.dsreal.de/chart/bash_chart.php?id='+m+'&world=ch'+srv+'&mode=player&art=all';
a.appendChild(img);

td.appendChild(a);
tr.appendChild(td);
s.parentNode.insertBefore(tr,s);

break;
}
}

}
)()
