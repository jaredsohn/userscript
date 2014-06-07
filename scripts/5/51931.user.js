// ==UserScript==
// @name           Xbox360Achievements Game Guide Links
// @namespace      http://userscripts.org
// @description    When searching Xbox360Achievements.org for a game, the search results page will have a link straight to each game's achievement guide page.
// @include        http://www.xbox360achievements.org/search.php
// ==/UserScript==

var results = document.getElementsByClassName("content")[0].getElementsByTagName("table")[0];
if(results.rows.length > 1)
{
	var newCell = results.rows[0].insertCell(3);
	newCell.style.fontWeight = "bold";
	newCell.style.fontSize = "130%";
	newCell.style.width = "124px";
	newCell.style.textAlign = "center";
	newCell.innerHTML = "Game Guide";
	
	var link;
	for(var i = 1; i < results.rows.length; i++)
	{
		newCell = results.rows[i].insertCell(3);
		newCell.style.fontWeight = "bold";
		newCell.style.textAlign = "center";
		link = results.rows[i].cells[1].getElementsByTagName("a")[0].href.replace("overview", "guide");
		newCell.innerHTML = "<a href='" + link + "'>Click here</a>";
	}
}