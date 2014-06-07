var PrecisionFactor = 1; // Decimal places to round percentages to. Feel free to modify.
// ==UserScript==
// @name           Pierate's Stat to Percentage
// @namespace      http://pierate/
// @description    Version 1.1 - Turn the progress bars on the charpane into percentages.
// @include        http://*kingdomofloathing.com/charpane.php
// @include        http://127.0.0.1:60*/charpane.php*
// @include        http://127.0.0.1:60*/compactmenu.php*
// @include        http://*kingdomofloathing.com/compactmenu.php*
// ==/UserScript==
// Thanks to yehman for the backbone of this script! Yay, nearly no work for me!
// Thank you to Aprocalypse for the original Stat to Pointer script. 
var tableArray = document.getElementsByTagName('table');
for (var i = 0; i < tableArray.length; i++)
{
  if (tableArray[i].title)  //looking for tables with non-empty titles
  {
	var SlashIndex = tableArray[i].title.indexOf("/"); // Find where the / is in the string.
	var FirstStat = tableArray[i].title.substring(0,SlashIndex-1); // Retrieve the first part of the stat value, making sure to leave out the /.
	FirstStat = FirstStat.replace(",",""); // ,s in numbers = BAD IDEA!
	var SecondStat = tableArray[i].title.substring(SlashIndex+1,tableArray[i].title.length+1); // Grab the rest of the stat string, again leaving out the /.
	SecondStat = SecondStat.replace(",",""); // ,s in numbers = BAD IDEA!
	var Percent = (FirstStat/SecondStat*100).toFixed(PrecisionFactor); // Work out the percentage, and then round to what the user asked for.
	
	// Set the  relavent HTML so the percentage appears.	
	tableArray[i].innerHTML = '<b>'+Percent+'</b>%';
    tableArray[i].style.fontSize = '8pt';
    tableArray[i].align = 'center';
    tableArray[i].style.border = '0';
    
  }
} 













