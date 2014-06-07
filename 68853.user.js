// ==UserScript==
// @name           DS - Verstecke ausgebaute Gebäude
// @namespace      Die Staemme
// @description    Versteckt die Ausgebauten Gebäude
// @include        http://de*.die-staemme.de/game.php*screen=main*
// ==/UserScript==

var anzahl = document.getElementsByTagName("table").length;
var table = document.getElementsByTagName("table")[anzahl - 2];

for (var i = 1; i < table.rows.length; i++)
{
    if (table.rows[i].cells.length == 2) {
        table.rows[i].className = "_toggle";
        table.rows[i].style.display = "none";
    }
}
if (document.getElementById("toggle_reqs") == null) {
    var lang = table.rows.length - 1;
    var AG =  table.insertBefore(document.createElement('label'),null);
    AG.innerHTML = "<input type=\"checkbox\" onclick=\"toggle_visibility_by_class('toggle','table-row')\" id=\"toggle_reqs\" name=\"toggle_reqs\" /> Alle Geb&auml;ude einblenden.";
}