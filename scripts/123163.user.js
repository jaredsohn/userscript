// ==UserScript==
// @name           TLPD Hide Spoilers
// @namespace      http://teamliquid.net
// @description    Hides the last 2 day's spoilers from TLPD
// @include        http://www.teamliquid.net/tlpd/korean/*
// ==/UserScript==

var tables = document.getElementsByTagName('td');
var index = -1;
var type = -1;
var matchup = "";

for (i = 0; i < tables.length; i++)
{
    var td = tables[i];
    
    // Detects the type of table based on its first entry
    if (td.innerHTML == "<strong>All</strong>:")
    {
	type = 1;
	index = 0;
    }
    if (td.innerHTML == "<strong>vT</strong>:")
    {
	type = 1;
	index = 0;
    }
    if (td.innerHTML == "<strong>vZ</strong>:")
    {
	type = 1;
	index = 0;
    }
    if (td.innerHTML == "<strong>vP</strong>:")
    {
	type = 1;
	index = 0;
    }
    if (td.innerHTML == "<strong>TvZ</strong>:")
    {
	type = 2;
	index = 0;
	matchup = "TvZ";
    }
    if (td.innerHTML == "<strong>ZvP</strong>:")
    {
	type = 2;
	index = 0;
	matchup = "TvP";
    }
    if (td.innerHTML == "<strong>PvT</strong>:")
    {
	type = 2;
	index = 0;
	matchup = "TvZ";
    }

    // A player entry, filter out the player's record and streak, and tell the
    // link to the details to skip today's games
    if (type == 1)
    {
	if (index == 0)
	{
	    index++;
	}
	else if (index == 1)
	{
	    td.innerHTML = "";
	    index++;
	}
	else if (index == 2)
	{
	    td.innerHTML = "";
	    index++;
	}
	else if (index == 3)
	{
	    td.innerHTML = "";
	    index++;
	}
	else if (index == 4)
	{
	    var links = td.getElementsByTagName('a');
	    for (j = 0; j < links.length; j++)
	    {
		var today = new Date();
		var oldday = new Date();
		oldday.setDate(today.getDate() - 2);
		
		datehref = "";
		datehref = datehref + "&from_year=1999&from_month=1&from_day=1";
		datehref = datehref + "&to_year=" + oldday.getFullYear();
		datehref = datehref + "&to_month=" + (oldday.getMonth() + 1);
		datehref = datehref + "&to_day=" + (oldday.getDate());
		
		links[j].href = links[j].href + datehref;
	    }
	    
	    index = -1;
	    type = -1;
	}
    }

    // A map entry, filter out the overall records and make the link to the
    // detailed stats to skip today's games.
    if (type == 2)
    {
	if (index == 0)
	{
	    index++;
	}
	else if (index == 1)
	{
	    td.innerHTML = "";
	    index++;
	}
	else if (index == 2)
	{
	    td.innerHTML = "";
	    index++;
	}
	else if (index == 3)
	{
	    var today = new Date();
	    var oldday = new Date();
	    var id;
	    oldday.setDate(today.getDate() - 2);
	    
	    datehref = "";
	    datehref = datehref + "&from_year=1999&from_month=1&from_day=1";
	    datehref = datehref + "&to_year=" + oldday.getFullYear();
	    datehref = datehref + "&to_month=" + (oldday.getMonth() + 1);
	    datehref = datehref + "&to_day=" + (oldday.getDate());
	    
	    id = td.innerHTML.substr(29,3);
	    
	    td.innerHTML = "<a href=\"http://www.teamliquid.net/tlpd/details.php?section=korean&type=maps&id=" + id + "&part=games&matchup=" + matchup + datehref + "\"> Games </a>";

	    index = -1;
	    type = -1;
	    matchup = "";
	}
    }
}
