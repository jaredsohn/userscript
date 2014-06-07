// ==UserScript==
// @name           DS-Alle Truppen Einfügen V 0.1
// @namespace      none
// @include        http://de*.die-staemme.de/game.php?*screen=place*
// @include        http://de*.die-staemme.de/game.php?screen=place*
// @include        http://de*.die-staemme.de/game.php?*screen=place
// @exclude        http://de*.die-staemme.de/game.php?*screen=place&mode=units
// @exclude        http://de*.die-staemme.de/game.php?*screen=place&mode=sim
// @exclude        http://de*.die-staemme.de/game.php?*screen=place&mode=neighbor
// @exclude        http://de*.die-staemme.de/game.php?*screen=place&try=confirm
// ==/UserScript==

var formular = window.document.forms[0];

//Truppen Einfügen
function truppen()
{	
	var link = formular.getElementsByTagName("a");
	
	for (i=0; i < link.length; i++)
	{	
		if (link[i].href.match(/^javascript:insertUnit/))
		{
			window.location.href = link[i].href;
		};
	};
};	


//Button Hinzufügen
var input = document.createElement('input');
input.setAttribute('type','button');
input.setAttribute('value','Truppen einfügen');
input.style.fontSize = "10pt";
input.style.backgroundColor = "rgb(210,210,250)";
input.setAttribute('class','truppen');
input.setAttribute('name','truppen');
input.addEventListener('click',truppen,false);
formular.appendChild(input);
