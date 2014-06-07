// ==UserScript==
// @name           HackWars High Scores Table Links Edit
// @namespace      Hack Wars High Scores Tables
// @description    Replace names on the high scores tables with links to the players stats.
// @include        http://www.hackwars.net/stats*
// ==/UserScript==

//Get the table object. Since there is only one table on the page it will be the first
//in the array
var x=document.getElementsByTagName('table')[0];

//loops through all 25 rows on the table
//starts on the second row because the first contains the column headers
for (var i = 1; i<251; i++)
{

	//gets the cells contained on the current row
	var y = x.rows[i].cells;
	
	//sets the value of the cell to be a link to that player's stats
	y[2].innerHTML = '<a href=\'/player?name=' + y[2].innerHTML + '\'>' + y[2].innerHTML + '<a/>';
	
}