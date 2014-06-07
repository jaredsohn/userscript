// ==UserScript==
// @name				Marktplatzlink
// @author				
// @namespace			http://userscripts.org
// @description			Fuegt in der Uebersicht eines Dorfes einen Link zum Marktplatz ein.
// @include			http://*.die-staemme.de/game.php?*screen=info_village&id=*
// ==/UserScript==




var old_row = document.evaluate('//td[. = "» Dorfübersicht"]/parent::tr', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var old_href = old_row.getElementsByTagName("a")[0].href	;
var vid = old_href.split("village=")[1].split("&")[0];
var t = (old_href.match(/[&,?](t=\d+\&)/)) ? RegExp.$1 : "";

var row = document.createElement("tr");
old_row.parentNode.insertBefore(row, old_row.nextSibling);

var cell = document.createElement("td");
cell.colSpan = "2";
row.appendChild(cell);

var link = document.createElement("a");
link.href = "/game.php?" + t + "village=" + vid + "&screen=market";
link.innerHTML = "&raquo; Marktplatz";
cell.appendChild(link);