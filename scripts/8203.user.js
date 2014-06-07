// Weight Watchers UK points for Recipezaar
// version 0.1 BETA!
// 2007-03-28
// Copyright (c) 2007, Ian D. Miller
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Weight Watchers Points", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Weight Watchers UK Points
// @namespace     http://yawmp.com/
// @description   Weight Watchers Points for recipe sites
// @include       http://*.recipezaar.com/*
// ==/UserScript==

var allTds, thisTd;

allTds = document.evaluate('//td', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var fat;
var calories;
var points;

for (var i = 0; i < allTds.snapshotLength; i++) {
    thisTd = allTds.snapshotItem(i);
	if (thisTd.innerHTML.substring(0,16) == '<strong>Calories'){
		calories = thisTd.innerHTML.substring(16);
		calories_temp = calories.split('</strong>');
		calories = calories_temp[0];
//		alert('calories: '+calories);
	}
	if (thisTd.innerHTML.substring(0,13) == 'Saturated Fat'){
		fat = thisTd.innerHTML.substring(14);
		fat_temp = fat.split('g');
		fat = fat_temp[0];
//		alert('fat: '+fat);
	}
}

if (fat && calories){
	points = Math.round((calories/70 + fat/4)*2)/2;

	document.getElementById('servings').innerHTML += '<b style="color:#f00">'+points+' Points</b>';
}
