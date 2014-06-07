// ==UserScript==
// @name           Player to BB
// @namespace      sdgsdgserg
// @include        http://de*.die-staemme.de/game.php*screen=info_player*id=*
// ==/UserScript==


var zusatz = " --> [color=#00ff00][i]frei[/i][/color]";









var dörfer = "";
for(var i=1;i<document.getElementsByClassName("vis")[1].getElementsByTagName("tr").length;i++)
{
dörfer += "[coord]"+document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[1].innerHTML+"[/coord]"+zusatz+"\n";
}
var bla = document.createElement("tr");
var blaa = document.createElement("td");
var blaaa = document.createElement("textarea");
blaaa.value = dörfer;
blaaa.setAttribute("cols", 50);
blaaa.setAttribute("rows", 5);
blaa.appendChild(blaaa);
bla.appendChild(blaa);
document.getElementsByClassName("vis")[1].appendChild(bla);