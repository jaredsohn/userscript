// ==UserScript==
// @name           Sryth Roller
// @namespace      Sryth
// @description    Sryth Perfect Stat Roller
// @include        http://www.sryth.com/game/ci.php
// ==/UserScript==


var bStopRolling = true;		//	Global to indicate passing roll or not.
var oStats = new Array();		//	The names of the stats to look for.
var iStatIndex = 0;				//	Index counter for stats intertation.
var iStat = 0;					//	value of the current stat being checked.
var iBadCount = 0;				//	Count of stats that do not pass.
var iTwentyCount = 0			//	Count of perfect stats.
	/*
		Change this value to set the minimum number
		of 20s you want in your stats.
		
		Set to 0 (zero) to not use this functionality.
	*/
var iMinimumTwentyCount = 3;

oStats[0] = 'Might';
oStats[1] = 'Agility';
oStats[2] = 'Body';
oStats[3] = 'Mind';
oStats[4] = 'Spirit';
oStats[5] = 'Aura';
oStats[6] = 'Luck';

for (iStatIndex in oStats) {
	iStat = parseInt(document.evaluate("//tr[td/font/b/a[.='" + oStats[iStatIndex] + "']]/td[2]", document, null, 9, null).singleNodeValue.textContent);
	if (iStat < 19) { bStopRolling = false; iBadCount++; }
	if (20 == iStat) {iTwentyCount++;}
}

if ( (0 == iBadCount) && (iMinimumTwentyCount <= iTwentyCount) ) {
	bStopRolling = true;
} else {
	bStopRolling = false;
}

Reroll(bStopRolling);



function Reroll(tStop) {
	
	var button = document.evaluate("//input[@value='REROLL STATS']", document, null, 9, null).singleNodeValue;
	
	if (tStop) { 
		button.disabled = true; alert('Found Perfect Stats.');
	} else { 
		button.click();
	}
}