//Livesoccertv.com channel sorter
// version 0.1 BETA!
// 2008-08-08
// Copyright (c) 2008, Darius Gai
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           livesoccertv channel sorter
// @namespace      www.dipzp.com
// @description    Sorts fixture based on channels listed in the array
// @include        http*://*livesoccertv.com/fixture*
// @include        http*://*livesoccertv.com/schedules*
// ==/UserScript==

//----------------EDIT HERE------------------------------------------------
//list of channels that you want to sort for - "*" if you want to list everything
//Case insensitive
var channels = ["CBC", "Setanta Sports", "NBC", "GolTV", "sportsnet","MSNBC"];
//Display games that are live
var showOnlyLiveGames = "1";
var highlightCurrentGames = "1";
//----------------STOP EDITING HERE----------------------------------

//get current time
var currentTime = new Date();
var currenthours = currentTime.getHours();
var hour1, hour2, finalhours;
var timepatt, timepatt1, timepatt2;
hour1=currenthours-1;
//checking for games that started between 2 hours ago and now
if(hour1==-1)
{
  hour1=23;
}
else if (hour1==-2)
{
  hour1=22;
}
hour2=currenthours-2;
if(hour2==-1)
{
  hour2=23;
}
else if (hour2==-2)
{
  hour2=22;
}

//function to form a function that matches the hours
function getTimePatt(hours)
{
    var timepatt;
	if (hours>=1 && hours <12)
	{
	  finalhours = hours + "...am";
	  //timepatt = new RegExp(finalhours,"i");
	  //alert("123");
	}
	else if (hours==0)
	{
	  hours=hours+12;
	  finalhours = hours + "...am";
	  //timepatt = new RegExp(finalhours,"i");
	}
	else if (hours==12)
	{
	  finalhours = hours + "...pm";
	  //timepatt = new RegExp(finalhours,"i");
	}
	else
	{
	  hours=hours-12;
	  finalhours = hours + "...pm";
	  //timepatt = new RegExp(finalhours,"i");
	}
	return finalhours;
}
timepatt = new RegExp(getTimePatt(currenthours),"i");
timepatt1 = new RegExp(getTimePatt(hour1),"i");
timepatt2 = new RegExp(getTimePatt(hour2),"i");
//alert(timepatt2);
//fetch all tables and put in array
var tables = document.getElementsByTagName("table");

//traverse through all tables in tables
var tab, finaltable;
for( var i=0; i < tables.length; i++)
{
  tab = tables[i];
  if (tab.style.border == "1px solid rgb(255, 255, 255)"){	
    //alert(tab.innerHTML);
	finaltable=tab;
  }
}

//get all table rows in final table
var tr = finaltable.getElementsByTagName("tr");
var reg, switch1, reg2;

//traverse final table and make all adjustments
for( var j=1;j < tr.length; j++)
{
  //highlight current game
  if(highlightCurrentGames =="1")
  {
    if(finaltable.rows[j].cells[0].innerHTML.match(timepatt) ||finaltable.rows[j].cells[0].innerHTML.match(timepatt1) || finaltable.rows[j].cells[0].innerHTML.match(timepatt2))
    {
      finaltable.rows[j].style.background = 'yellow';
    }
  }
  switch1="1";
  for (var k=0; k<channels.length; k++)
  {
    //compare rows to channels listed above
	reg=new RegExp(channels[k],"i");
	if (finaltable.rows[j].cells[2].innerHTML.match(reg))
	{
	  switch1="0";
	}
  }
  //checks to see if games are live
  if(showOnlyLiveGames=="1" && switch1=="0")
  {
    reg2=new RegExp("Live","i");
	if (finaltable.rows[j].cells[3].innerHTML.match(reg2))
	{
	  switch1="0";
	}
	else
	{
	  switch1="1";
	}
  }
  if(switch1=="1")
  {
    //hide games that aren't according to the user preferences
    finaltable.rows[j].style.display = 'none';
  }
}