// ==UserScript==
// @name        Accountsuche
// @namespace   PaveLow45
// @include     *cp.rpg-city.de/*funktion=_sucheusers*
// @version     1
// ==/UserScript==

var table = document.getElementsByClassName("content")[0].getElementsByTagName("table")[0];
var content = document.getElementsByClassName("content")[0];
document.getElementsByTagName("a")[2].href.search(/ticket=(.*)/);
var ticket = RegExp.$1;

table.getElementsByTagName("tr")[0].getElementsByTagName("td")[1].setAttribute("style", "width:10%;");

var a;
var u = 6;
for(var i=1; i < table.getElementsByTagName("tr").length; i++)
{
	a = document.createElement("a");
	a.innerHTML = "<form method='POST' action='index.php?funktion=_suchemultiacc&ticket="+ticket+"' target='_blank' style='display:inline;'><input type='hidden' name='ip' value='"+document.getElementsByTagName("td")[u].innerHTML+"'><input type='image' src='http://www.poqoo.de/style/imageset/icons/suche_icon.png' title='Multiaccountsuche'></form>";
	a.setAttribute("style", "margin-right:5px;");
	table.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].insertBefore(a, table.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].lastChild);
	table.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].setAttribute("style", "");
	u += 4;
}