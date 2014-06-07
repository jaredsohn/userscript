// ==UserScript==
// @name            Die Stämme - Hauptgebäudeerweiterung - Alle Accounttypen
// @namespace       Die Staemme
// @description     Macht die Hauptgebäudeübersicht kompakter und zeigt zusätzlich die Punktzahlen für die jeweils nächsten Gebäudestufen an.
// @version         1.2
// @injectframes    1
// @include         http://de*.die-staemme.de/game.php?village=*&screen=main
// @exclude			http://de1.die-staemme.de/game.php?village=*&screen=main
// @exclude			http://de2.die-staemme.de/game.php?village=*&screen=main
// @exclude			http://de3.die-staemme.de/game.php?village=*&screen=main
// @exclude			http://de4.die-staemme.de/game.php?village=*&screen=main
// @exclude			http://de5.die-staemme.de/game.php?village=*&screen=main
// @exclude			http://de6.die-staemme.de/game.php?village=*&screen=main
// @exclude			http://de7.die-staemme.de/game.php?village=*&screen=main
// @exclude			http://de8.die-staemme.de/game.php?village=*&screen=main
// @exclude			http://de9.die-staemme.de/game.php?village=*&screen=main
// @exclude			http://de15.die-staemme.de/game.php?village=*&screen=main
// @exclude			http://dec1.die-staemme.de/game.php?village=*&screen=main
// ==/UserScript==

//********************************************************************************************
// (c) By Softyx (Helping Hand: Dwel^^) (2008) GPL
//********************************************************************************************

//Punkte
var gebaudepunkte = new Array();
gebaudepunkte['main'] = new Array(10,2,2,3,4,4,5,6,7,9,10,12,15,18,21,26,31,37,44,53,64,77,92,110,133,159,191,229,274,330);
gebaudepunkte['barracks'] = new Array(16,3,4,5,5,7,8,9,12,14,16,20,24,28,34,42,49,59,71,85,102,123,147,177,212);
gebaudepunkte['stable'] = new Array(20,4,5,6,6,9,10,12,14,17,21,25,29,36,43,51,62,74,88,107);
gebaudepunkte['garage'] = new Array(24,5,6,6,9,10,12,14,17,21,25,29,36,43,51);
gebaudepunkte['snob'] = new Array(512);
gebaudepunkte['smith'] = new Array(19,4,4,6,6,8,10,11,14,16,20,23,28,34,41,49,58,71,84,101);
gebaudepunkte['place'] = new Array(00);
gebaudepunkte['statue'] = new Array(24);
gebaudepunkte['market'] = new Array(10,2,2,3,4,4,5,6,7,9,10,12,15,18,21,26,31,37,44,53,64,77,92,110,133);
gebaudepunkte['wood'] = new Array(6,1,2,1,2,3,3,3,5,5,6,8,8,11,13,15,19,22,27,32,38,46,55,66,80,95,115,137,165,198);
gebaudepunkte['stone'] = new Array(6,1,2,1,2,3,3,3,5,5,6,8,8,11,13,15,19,22,27,32,38,46,55,66,80,95,115,137,165,198);
gebaudepunkte['iron'] = new Array(6,1,2,1,2,3,3,3,5,5,6,8,8,11,13,15,19,22,27,32,38,46,55,66,80,95,115,137,165,198);
gebaudepunkte['farm'] = new Array(5,1,1,2,1,2,3,3,3,5,5,6,8,8,11,13,15,19,22,27,32,38,46,55,66,80,95,115,137,165);
gebaudepunkte['storage'] = new Array(6,1,2,1,2,3,3,3,5,5,6,8,8,11,13,15,19,22,27,32,38,46,55,66,80,95,115,137,165,198);
gebaudepunkte['hide'] = new Array(5,1,1,2,1,2,3,3,3,5);
gebaudepunkte['wall'] = new Array(8,2,2,2,3,3,4,5,5,7,9,9,12,15,17,20,25,29,36,43);

// Tabelle ausfindig machen
var erste = document.getElementsByTagName("table")[0];
var anzahl = document.getElementsByTagName("table").length;
var table = document.getElementsByTagName("table")[anzahl - 2];

// Titelzeile
var AG =  table.rows[0].insertBefore(document.createElement('th'),null);
AG.innerHTML = "Punkte";

for (var i = 1; i < table.rows.length; i++)
{
	// Rohstoffe Zug entfernen
	if (table.rows[i].cells.length > 6)
	{
		var ausbau = table.rows[i].cells[6];
		var notver = ausbau.innerHTML.length;
		var fertig = ausbau.innerHTML.substr(21,(notver-21));
		var capita = ausbau.innerHTML.substr(19,2).toUpperCase();
		if (ausbau.innerHTML.match("Rohstoffe verfügbar"))
		{
			ausbau.innerHTML = capita + fertig
		}
		else if (ausbau.innerHTML.match("Zu wenig Rohstoffe um in der Bauschleife zu produzieren."))
		{
			ausbau.innerHTML = "Nicht in Bauschleife m&ouml;glich";
		}
		else if (ausbau.innerHTML.match("Rohstoffe ausreichend verfügbar"))
		{
			ausbau.innerHTML = "Rohstoffe verf&uuml;gbar";
		}
	}

	//Punkteanzeige
	var gebaude = new Object;

	if (table.rows[i].cells.length > 6)
	{
		gebaude.zelle_anzeige = table.rows[i].insertBefore(document.createElement('td'),null);
		gebaude.zelle_anzeige.setAttribute("align","right");
		gebaude.zelle_typ = table.rows[i].cells[0];
		
		gebaude.stufe = gebaude.zelle_typ.innerHTML.match(/Stufe ([0-9]+)/);
		gebaude.typ = gebaude.zelle_typ.innerHTML.match(/buildings[\/\\](.*?)\.png/);
				
		if (gebaude.stufe && gebaude.typ && gebaudepunkte[gebaude.typ[1]])
		{
			gebaude.zelle_anzeige.innerHTML = gebaude.zelle_anzeige.innerHTML + " <span style=\"color:#336699;\">+" + gebaudepunkte[gebaude.typ[1]][gebaude.stufe[1]] + " P.</span>";
		}
	}
}

// HG Head verkleinern
if (erste.innerHTML.match("Notizen")) // Für PA
{
	// Beschreibung entfernen
	var headtable2 = document.getElementsByTagName("table")[16].rows[0].cells[1];
	headtable2.setAttribute("valign","middle");
	var gebaudename = headtable2.innerHTML.split("</h2>")[0];
	headtable2.innerHTML = gebaudename + "</h2>";

	// Bild verkleinern	
	var headtable1 = document.getElementsByTagName("table")[16].rows[0].cells[0];
	headtable1.innerHTML = "<img src=\"graphic/face.png\" alt=\"Hauptgebäude\" height=\"18\" width=\"18\" />"
	
}
else // Für ohne PA
{
	// Beschreibung entfernen
	var headtable2 = document.getElementsByTagName("table")[8].rows[0].cells[1];
	headtable2.setAttribute("valign","middle");
	var gebaudename = headtable2.innerHTML.split("</h2>")[0];
	headtable2.innerHTML = gebaudename + "</h2>";

	// Bild verkleinern	
	var headtable1 = document.getElementsByTagName("table")[8].rows[0].cells[0];
	headtable1.innerHTML = "<img src=\"graphic/face.png\" alt=\"Hauptgebäude\" height=\"18\" width=\"18\" />"
}