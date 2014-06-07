// ==UserScript==
// @name          USARMY Mitgliederlisten Nummerierung
// @author        Thomas Büning
// @namespace     http://usinfantry.derchaot.bplaced.de
// @description   Nummeriert die Einträge der Memberliste
// @include       http://usarmy.schulterglatze.de/troop/overview/members
// ==/UserScript==

var tabelle = document.getElementById("truppemitglieder");

//Anzahl der Mitglieder ermitteln
var mitglieder = document.getElementsByClassName("feldpost_box")[0].getElementsByClassName("link")[0].innerHTML;
mitglieder = parseInt(mitglieder);

//Ändern des Tabellenkopfes
var tabkopftdneu = "<th></th>";
tabelle.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].insertAdjacentHTML("AfterBegin", tabkopftdneu);

//Tabelle nummerieren
var x = 1;
for (var i = 0; i <= mitglieder; i++) {
	var nummer = "<td align='center'>" + x + "</td>";
	tabelle.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].insertAdjacentHTML("AfterBegin", nummer);
	x++;
}
