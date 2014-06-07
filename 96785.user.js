// ==UserScript==
// @name           Spendenlink Klicker für spenden-knastvoegel.de
// @namespace      Boggler @ Pennerhack recoded by Kiff_Kev84
// @description    Klickt automatisch alle Links auf den seiten spenden-knastvoegel.de und knastvögel-spenden.de
// @include        http://*knastvögel-spenden.de/*
// @include        http://*spenden-knastvoegel.de/*
// ==/UserScript==


document.getElementById('contend').innerHTML += '<b>Klickbot:<b><br>ACHTUNG DIE LINKS WERDEN IN TABS GEOEFFNET DER PC KANN BEI HOHEN ZAHLEN LANGSAM WERDEN <br>Wieviele Links klicken: <input type="text" size="2" id="anzahl" value="'+GM_getValue('anzahl')+'"><br><input type="button" id="starten" value="Klicker starten">';
//table 1

document.getElementById('starten').addEventListener('click', function klicken(){
GM_setValue('anzahl', document.getElementById('anzahl').value);

var table = document.getElementsByTagName('table')[1];
for(i=1;i<=GM_getValue('anzahl');i++){
var link = table.innerHTML.split('<a href="')[i].split('"')[0];
window.open(link);
}
location.reload();



}, false);

