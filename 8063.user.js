// ==UserScript==

// @name           Wrts-lijst bewerken

// @namespace      http://userscripts.org/tags/Wrts

// @include        http*://*.wrts.nl/*

var td;

td = document.getElementsByTagName('td');

for (i = 0; i < td.length; i++)

{

	if (td[i].className == "command")

		{

		id = td[i].firstChild.href.match(/[0-9]+/);

		td[i].innerHTML = "<a href=\"/lijst/edit/"+id+"\">Bewerken</a> <br /> <a href=\"/overhoor/start/"+id+"\">Overhoren</a>\n<br /> <a href=\"/lijst/delen/"+id+"\">Delen</a>";

		}

}