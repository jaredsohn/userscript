// ==UserScript==
// @name				DSaddDSrealLink
// @author				Heinzel
// @namespace			none
// @description			Fuegt im Profil eines Spielers einen Link zur DSreal-Akte des Spielers ein
// @include			http://*.die-staemme.de/game.php?*screen=info_player&id=*
// ==/UserScript==



/* Den Spielserver ermitteln */
var server = location.host.split(".")[0];

/* ID des Spielers ermitteln */
var ID = location.href.match(/screen=info_player\&id=(\d+)/)[1];

/* Die URL erzeugen */
var url = "http://www.dsreal.de/index.php?tool=akte&mode=player&world=" + server + "&id=" + ID;

/* Den Link einsetzen */
var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var row = document.createElement("tr");
tab.appendChild(row);

var cell = document.createElement("td");
cell.colSpan = "2";
row.appendChild(cell);

var link = document.createElement("a");
link.href = url;
link.target = "_blank";
link.innerHTML = "&raquo; DSReal-Akte";
cell.appendChild(link);
cell.innerHTML += " (externe Seite)";