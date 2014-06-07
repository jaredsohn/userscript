// Team ranking utility for chess.com team matches
// version 0.1
// 5-Aug-2010
// Copyright (c) 2010, Alfonso Mingo
//
// ==UserScript==
// @name           Team Ranking
// @namespace      http://userscripts.org/users/12706
// @description    Adds a ranking number to all members listed in the match
// @include        http://www.chess.com/groups/team_match.html*
// ==/UserScript==

//add numbers to the table
div = document.getElementById("content");
var table = div.getElementsByTagName("table")[0];
var rows = table.getElementsByTagName("tr");
var cell = null;
var row = null;
for (i=1,counter=1; i<rows.length-1; i++,counter++) {
	cell = rows[i].getElementsByTagName("td")[0];
	cell.innerHTML = counter + "&nbsp;" + cell.innerHTML;
}