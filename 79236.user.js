// ==UserScript==
// @name           dtr
// @namespace      gchang
// @include        http://www/dtr/view.php
// ==/UserScript==

/**
 * @sVal Value to be padded
 * @nLen Maximum length for value
 */
function padStringWithZeroes(sVal, nLen)
{
	var sPadding = "";
	for(var i = sVal.length; i < nLen; i++)
	{
			sPadding += "0";
	}
	
	var sNewString = sPadding + sVal;
	
	return sNewString;
}

var WEEKDAY=new Array(7);
WEEKDAY[0]="SUN";
WEEKDAY[1]="MON";
WEEKDAY[2]="TUE";
WEEKDAY[3]="WED";
WEEKDAY[4]="THU";
WEEKDAY[5]="FRI";
WEEKDAY[6]="SAT";

var oFontElement = document.getElementsByTagName("font");
var nFontCount = oFontElement.length;

// loop through each font tag
for (var i = 0; i < nFontCount; i++)
{
	var sFontContent = oFontElement[i].innerHTML;

	// get text with only length of 3;
	// these are dates in this format: "MM - DD - YYYY"
	var oSplitFont = sFontContent.split(" - ");
	if (oSplitFont.length == 3)
	{
		// remove spaces in date
		var sNewFontContent = sFontContent.replace(/ /gi, "");
		
		// create date object for parsed date
		var sYear = oSplitFont[2];
		var sMonthParsed = oSplitFont[0];
		var sMonth = oSplitFont[0]-1; // month is minus 1
		var sDay = oSplitFont[1];
		var sHours = 0;
		var sMinutes = 0;
		var sSeconds = 0;
		var sMilliseconds = 0;
		var oDate = new Date(sYear, sMonth, sDay, sHours, sMinutes, sSeconds, sMilliseconds);
		
		// display date as "YYYY-MM-DD (WEEKDAY)"
		oFontElement[i].innerHTML = sYear + "-" + padStringWithZeroes("" + sMonthParsed, 2) + "-" + padStringWithZeroes("" + sDay, 2) + " (" + WEEKDAY[oDate.getDay()] + ")";
	}
}