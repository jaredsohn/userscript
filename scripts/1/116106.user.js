// ==UserScript==
// @name           Torn Drug Tracker
// @namespace      userscripts.org
// @description    Tracks drug use since last rehab and gives user the figure on events page
// @include        *
//
// @author 	   BiggM0nk
// @version 	   22/10/2011
// ==/UserScript==

var myLevel = document.getElementById("player-stats").getElementsByTagName("tr")[3];
myLevel = parseInt(myLevel.getElementsByTagName("td")[1].innerHTML);

var jailTable = document.getElementsByTagName("table")[5];
var tableRows = jailTable.getElementsByTagName("tr");

var rowLevel;

for(var i = 1; i < tableRows.length; i++)
{
	rowLevel = parseInt(tableRows[i].getElementsByTagName("td")[4].innerHTML);

	if(Math.abs(myLevel - rowLevel) > 1)
	{
		tableRows[i].style.display = "none";
	}
}