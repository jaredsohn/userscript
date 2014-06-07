// ==UserScript==
// @name		UD Better HP Colorizer
// @namespace		http://www.aichon.com
// @description		Colorizes HP by how much remains and removes the "HP" text
// @include		http://urbandead.com/*
// @include		http://www.urbandead.com/*
// @exclude		http://urbandead.com/map.cgi?logout
// @exclude		http://www.urbandead.com/map.cgi?logout
// ==/UserScript==

/* Urban Dead Better HP Colorizer
 * v1.0
 *
 * Copyright (C) 2009 Bradley Sattem
 * Author: Bradley Sattem (a.k.a. Aichon)
 * Last Modified: 2009-12-06
 * 
 * Tested under: Safari 4.0 on Mac
 *   
 * Contact: [my first name [DOT] my last name]@gmail.com (check the Copyright info for my name)
 *
 * Changes:
 *   v1.1.1	- BUG FIX: Small glitch when displaying injured survivors while a zombie
 *   v1.1	- Now works for zombies with Scent Blood and/or Infectious Bite
 *   v1.0	- Initial public release
 *
 */


colorHP();

function colorHP() {
	var sub = document.evaluate("//div[@class='gt']//sub", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var hp;
	for(var i = 0; i < sub.snapshotLength; i++) {
		var inf = false;
		if(sub.snapshotItem(i).hasChildNodes && sub.snapshotItem(i).firstChild.nodeType == 3 && sub.snapshotItem(i).firstChild.nodeValue == 'HP') {
			hp = sub.snapshotItem(i).previousSibling.nodeValue.substring(2);
			removeTarget1 = sub.snapshotItem(i).previousSibling;
			removeTarget2 = sub.snapshotItem(i).nextSibling;
			if((hp != 60 && hp !=50) || (hp == 50 && (sub.snapshotItem(i).parentNode.className == "trg" || sub.snapshotItem(i).parentNode.className == "inf"))) {
				if(sub.snapshotItem(i).parentNode.className == "inf") inf = true;
				var newHP = document.createElement('span');
				newHP.style.color = getHPColor(hp, inf);
				newHP.innerHTML = " (" + hp + ")";
				sub.snapshotItem(i).parentNode.insertBefore(newHP, sub.snapshotItem(i).previousSibling);
				removeTarget1.parentNode.removeChild(removeTarget1);
				removeTarget2.nodeValue = removeTarget2.nodeValue.substring(1);
			}
		}
	}

	var hpText = document.evaluate("//div[@class='gt']//sub", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	removeHPText(hpText);
}

function removeHPText(hpText) {
	for(var i = 0; i < hpText.snapshotLength; i++) {
		hpText.snapshotItem(i).parentNode.removeChild(hpText.snapshotItem(i));
	}
}

function getHPColor(hp, inf) {
	var level = hp / 60;
	var color = '#';

	if(inf) var c = [[170, 180, 70], [120, 240, 40]];
	else var c = [[255, 40, 60], [240, 175, 120]];
	
	for (var i = 0; i < 3; ++i)
		color += ('0' + parseInt(c[0][i] + ((c[1][i] - c[0][i]) * level)).toString(16)).substr(-2);
	
	return color;
}