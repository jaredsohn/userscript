// ==UserScript==
// @name           Zombja Sonar Zs: 0 Hider
// @namespace      Ren Po Ken
// @description    Hides the Zs: 0  in the Zombja Sonar
// @include        http://*animecubed.com/billy/bvs/zombjasonar.html
// ==/UserScript==


var SonarCells = document.evaluate("//td[@class='map_td']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
													//The above line gets the individual cells of the Sonar Map
var td;
for (var i = 0; td = SonarCells.snapshotItem(i); i++)
	if (/Zs: 0/i.test(td.innerHTML))				//checks for the dreaded "Zs: 0" string in the cell
		{temp = td.innerHTML.split("Zs: 0");		//splits the td and creates the arrays.  "Zs: 0" gets lost
		td.innerHTML=temp.join("");}				//rejoins the arrays without any deliminator