// ==UserScript==
// @name           OnlineClock Custom
// @namespace      http://online.net/*
// @description    Deletes top/bottom tables (fixing size issue) and sets the alarm to 7:07 am, and makes the txt to XL
// @include        http://onlineclock.net/
// ==/UserScript==

//Delete the top and bottom text
var tables = document.getElementsByTagName("table");
tables[0].parentNode.removeChild(tables[0]); //Top Table
tables[3].parentNode.removeChild(tables[3]); //Bottom Table

//Change clock size to XL
for (i = 0; i <= 7; i++)
{
	//small colon images
	if( (i==2)||(i==5) )
	{
		document.images[i].width = 36;
		document.images[i].height = 100;
	}
	//normal numbers
	else
	{
		document.images[i].width = 180;
		document.images[i].height = 250;
	}
}

//Change the alarm time. --> tested and yes it still sets the alarm off.
var alarmHour = document.getElementsByName("alarm_hour");
var alarmMin = document.getElementsByName("alarm_minute");

alarmHour[0].selectedIndex=7;
alarmMin[0].selectedIndex=7;