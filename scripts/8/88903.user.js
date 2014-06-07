// ==UserScript==
// @name           Dörfer pro Spieler
// @namespace      Dörfer pro Spieler
// @description    Zeigt auf der Stammesrangliste Dörfer pro Spieler an
// @include        http://*.die-staemme.de/game.php?*village=*&screen=ranking*&mode=ally*
// ==/UserScript==
var anzahl = document.getElementsByTagName("table").length;
var table = document.getElementsByTagName("table")[anzahl - 3];

for (var i = 1; i < table.rows.length; i++)
{
	reihe = new Object;
	var spieler = table.rows[i].cells[4].innerHTML;
	var dorfer = table.rows[i].cells[6].innerHTML;
	reihe.zelle_anzeige = table.rows[i].insertBefore(document.createElement('td'),null);
	reihe.zelle_anzeige.setAttribute("align","left");
	ds1 = dorfer/spieler
	ds2 = Math.round(ds1*100)/100;
	reihe.zelle_anzeige.innerHTML = ds2;
}
	reihe = new Object;
	reihe.zelle_anzeige = table.rows[0].insertBefore(document.createElement('th'),null);
	reihe.zelle_anzeige.setAttribute("align","left");
	reihe.zelle_anzeige.innerHTML = "<b>D&ouml;rfer pro Spieler</b>";