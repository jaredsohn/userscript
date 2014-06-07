// Weight Watchers points for Recipezaar
// version 0.1 BETA!
// 2/17/2007
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
// @name          Weight Watchers Points
// @namespace     http://yawmp.com/
// @description   Weight Watchers Points for recipe sites
// @include       http://*.recipezaar.com/*
// ==/UserScript==

var allTds, thisTd;

allTds = document.evaluate('//td', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var fat;
var fiber;
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
	if (thisTd.innerHTML.substring(0,13) == 'Dietary Fiber'){
		fiber = thisTd.innerHTML.substring(14);
		fiber_temp = fiber.split('g');
		fiber = fiber_temp[0]
//		alert('fiber: '+fiber);
	}
	if (thisTd.innerHTML.substring(0,17) == '<strong>Total Fat'){
		fat = thisTd.innerHTML.substring(27);
		fat_temp = fat.split('g');
		fat = fat_temp[0];
//		alert('fat: '+fat);
	}
}

if (fat && calories && fiber){
	if (fiber > 4){
		fiber = 4;
	}
	points = Math.round(calories/50 + fat/12 - fiber/5);

	document.getElementById('servings').innerHTML += '<b style="color:#f00">'+points+' Points</b>';
}
