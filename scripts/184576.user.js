// ==UserScript==
// @name        VIP-Verkäufe kenntlich machen
// @namespace   ff_*
// @description Ändert die Hintergrundfarbe bei den VIP-Verkäufen und hebt sie so hervor
// @include     http://www.howrse.de/marche/vente/index?type=direct&tri=expirationDate&sens=DESC
// @version     1
// @grant       none

// ==/UserScript==
var ff_DatumJetzt = new Date;
var ff_DatumHeute = ff_DatumJetzt.getDate();
var ff_Verkaufstabelle = document.getElementById("table-0");
var i, j, k, letzterFund, m;
var j = ff_Verkaufstabelle.getElementsByTagName("tbody")[0].childNodes;
for (i = 0; i < j.length; i = i + 1) {
  //alert(j.length + " " + i);
  k = j[i].getElementsByTagName("td")[10].innerHTML;

  if(k.substr(7,2) != ff_DatumHeute) {
    j[i].style.backgroundColor = "orange";
    letzterFund = i;
  }
  //alert(k);
}
for(i = 0; i < letzterFund; i++) {
 j[i].style.backgroundColor = "orange";
}