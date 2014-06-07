// HattrickSkills
// Version 0.2.2
// Created :  
// Created By : Wieland
// DISCLAIMER: This script comes with no warranty whatsoever. It may kill your cat, set your house on fire,
// or get you banned from hattrick.org. Use at your own risk!
// LICENSE: CC BY-SA 3.0, see http://creativecommons.org/licenses/by-sa/3.0/

// ==UserScript==
// @name           HattrickSkills
// @namespace      http://www.alamagordo.org/userscripts/hattrick
// @description    Shows numerical value for player skills etc on Hattrick.org
// @include        http://www*.hattrick.org/*
// @exclude
// @history	   0.0.1  initial release [2011-07-17]
// @history	   0.1 now works in all languages, and uses xpath [2011-07-17]
// @history	   0.2 Added scales for all contexts (e.g., max player skill = 20, max fan mood = 11, etc) [2011-07-18]
// @history	   0.2.1 now works for sponsor mood on Finance page, too [2011-07-18] 
// @history	   0.2.2 fixed scales for Morale and Confidence after a change at the Hattrick.org website broke them [2011-12-28]
// ==/UserScript==

(function() { function addNums() {
	var skills = document.evaluate("//a[contains(@href, 'AppDenominations.aspx')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var n = skills.snapshotLength;
	for (var i = 0; i < n; i++) {
		var link = skills.snapshotItem(i).href;
		if (link.match(/ll=\d+/)) {
			var lvl = link.match(/ll=\d+/).toString().substr(3);
		} else if (link.match(/labellevel=\d+/)) {
			var lvl = link.match(/labellevel=\d+/).toString().substr(11);
		}
		if (link.match(/lt=\w+/)) {
			var scale = link.match(/lt=\w+/).toString().substr(3);
		} else if (link.match(/labeltype=\w+/)) {
			var scale = link.match(/labeltype=\w+/).toString().substr(10);
		}
		switch(scale)  {
		case 'skillshort':
			var max = 8;
			break;
		case 'skill':
			var max = 20;
			break;
		case 'teamskills':
		// adjust scale - lowest value is 3
			lvl = lvl - 3;
			var max = 7;
			break;
		case 'sponsors':
			var max = 9;
			break;
		case 'FanMood':
			var max = 11;
			break;
		case 'FanMatch':
			var max = 10;
			break;
		case 'FanSeason':
			var max = 7;
			break;
		case 'gentleness':
			var max = 5;
			break;
		case 'honesty':
			var max = 5;
			break;
		case 'aggressiveness':
			var max = 5;
			break;
		case 'morale':
		// scale needs adjustment
			if (lvl == 11) {
				lvl = 10;
			} else {
				lvl = lvl - 12;
			}			
			var max = 10;
			break;
		case 'confidence':
		// scale needs adjustment
			if (lvl == 22) {
				lvl = 9;				
			} else {
				lvl = lvl -23;
			}			
			var max = 9;
			break;
		default:
			var max = null;
			break;
		} 
		skills.snapshotItem(i).lastChild.nodeValue = skills.snapshotItem(i).lastChild.nodeValue +" (" +lvl +"/" +max +")";
	}
}

addNums();

}) ();
