// ==UserScript==
// @name           Wrts Extra Functie`s 01
// @namespace      http://userscripts.org/tags/Wrts
// @description    Een Wrts-lijst direct bewerken vanuit de lijstenpagina, direct naar lijsten gaan vanplaats naar de homepage en de delen functie aan alle lijsten toegevoegd!
// @include        http://www.wrts.nl/lijst
// @include        http://www.wrts.nl/lijst/index
// ==/UserScript==
var td;
td = document.getElementsByTagName('td');
for (i = 0; i < td.length; i++)
{
	if (td[i].className == "command")
		{
		id = td[i].firstChild.href.match(/[0-9]+/);
		td[i].innerHTML = "<a href=\"/lijst/edit/"+id+"\">Bewerken</a> <br /> <a href=\"/lijst/delen/"+id+"\">Delen</a> <br /> <a href=\"/overhoor/start/"+id+"\">Overhoren</a>";
		}
}
var check = document.getElementById("loginVak");
if (check)
	{
	location.href = "http://www.wrts.nl/lijst";
	}