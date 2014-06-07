// ==UserScript==

// @name           Robot Invasion Alle Truppen einfügen
// @version         1.0
// @namespace      Robot Invasion
// @description    Fügt mit einem Klick alle vorhandenn Truppen im Versammlungsplatz ein 
// @include        http://s*.robot-invasion.at/game.php?village=*&oreId=*&screen=place*
// @author         sutuser/bandido1 

// ==/UserScript==



var formular = window.document.forms[0];

//Truppen Einfügen
function truppen()
{	
	var link = formular.getElementsByTagName("a");
	
	for (i=0; i < link.length; i++)
	{	
		if (link[i].href.match(/^javascript:setInputValue/))
		{
			window.location.href = link[i].href;
		};
	};
};	


//Button Hinzufügen
var input = document.createElement('input');
input.setAttribute('type','button');
input.setAttribute('value','Alle Truppen einfügen');
input.style.fontSize = "10pt";
input.style.backgroundColor = "rgb(210,210,250)";
input.setAttribute('class','truppen');
input.setAttribute('name','truppen');
input.addEventListener('click',truppen,false);
formular.appendChild(input);