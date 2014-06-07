// ==UserScript==
// @name            Robot Invasion - Punkteerweiterung
// @namespace       Robot Invasion
// @description     Zeigt zusätzlich die Punktzahlen für die jeweils nächsten Gebäudestufen an.
// @version         1.0
// @injectframes    1
// @include         http://s*.robot-invasion.at/game.php?village=*&oreId=*screen=architect*
// @author          sutuser/bandido1 

// ==/UserScript==


//Punkte
var gebaudepunkte = new Array();
gebaudepunkte['architect'] = new Array(6,1,2,2,3,3,4,5,5,8,9,10,14,16,21,25,31,38,46,57,71,87,106,131,162);
gebaudepunkte['school'] = new Array(6,2,1,3,3,3,5,6,7,9,11,14,17,22,27,35,42,53,67,83,104,131,162,203,255);
gebaudepunkte['barracks'] = new Array(12,3,3,4,5,7,8,9,12,14,18,22,27,33,41,50,61,76,93,115,141,173,213,263,322);
gebaudepunkte['machine'] = new Array(15,3,4,5,6,8,8,11,14,16,20,24,29,36,44,53,65,80,97,118);
gebaudepunkte['factory'] = new Array(18,4,6,6,9,10,12,16,20,24,30,37,46,57,71);
gebaudepunkte['controlcenter'] = new Array(512);
gebaudepunkte['laboratory'] = new Array(25,6,7,9,10,13,17,19,25,30,37,46,56,69,85);
gebaudepunkte['place'] = new Array(6);
gebaudepunkte['marked'] = new Array(16,3,4,5,6,7,9,11,13,15,19,22,28,33,40,48,59,71,86,103);
gebaudepunkte['farm'] = new Array(6,2,2,2,3,4,5,6,8,10,13,15,20,25,32,39,50,63,79,100,126,159,200,252,317);
gebaudepunkte['storage'] = new Array(6,2,2,2,3,4,5,6,8,10,13,15,20,25,32,39,50,63,79,100,126,159,200,252,317);
gebaudepunkte['hide'] = new Array(4,1,2,3,4,5,6,9,13,17);
gebaudepunkte['wall'] = new Array(14,3,3,4,5,6,7,8,10,12,15,17,21,25,30,36,43,52,62,74);


// Tabelle ausfindig machen
var erste = document.getElementsByTagName("table")[0];
var anzahl = document.getElementsByTagName("table").length;
var table = document.getElementsByTagName("table")[anzahl - 1];

// Titelzeile
var AG =  table.rows[0].insertBefore(document.createElement('th'),null);
AG.innerHTML = "Punkte";

for (var i = 1; i < table.rows.length; i++)
{
 

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
			gebaude.zelle_anzeige.innerHTML = gebaude.zelle_anzeige.innerHTML + " <span style=\"color:#336699;\">+" + gebaudepunkte[gebaude.typ[1]][gebaude.stufe[1]] + " Pkt.</span>";
		}
	}
}
