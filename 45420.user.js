// ==UserScript==
// @name				DSReal Tools Link
// @author				Zaziki
// @namespace			none
// @description			Fuegt im Profil eines Spielers einen Link ein
// @include			http://*.die-staemme.de/game.php?*screen=info_player&id=*
// ==/UserScript==


var server = location.host.split(".")[0];

var ID = location.href.match(/screen=info_player\&id=(\d+)/)[1];

var url = "http://www.dsreal.de"

var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var row = document.createElement("tr");
tab.appendChild(row);

var cell = document.createElement("td");
cell.colSpan = "3";
row.appendChild(cell);

var link = document.createElement("a");
link.href = url;
link.target = "_blank";
link.innerHTML = "&raquo; DSReal(Mainpage)";
cell.appendChild(link);
