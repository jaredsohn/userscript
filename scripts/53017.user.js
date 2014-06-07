// ==UserScript==
// @name		NatNit's GGG and Spirit Hobo Charge Tracker
// @description Version 0.3 - Final
// @include 	http://*kingdomofloathing.com/fight.php*
// @include		http://127.0.0.1:60*/fight.php*
// @exclude		http://forums.kingdomofloathing.com/*
// ==/UserScript==

// Thanks to StDoodle and Rattylabray for their immense debugging help

var notifiers = new Array(
	"grinning uneasily and grinding his back molars, muttering something about millennium hands",	// Hobo_noBooze
	"Oh, Helvetica, damn good girl she was",														// Hobo_lastBooze
	"the impression you get right now.",															// GGG_noFood_during1
	"lolls back and forth, holding his growling stomach",											// GGG_noFood_during2
	"s stomach growls loudly.",																		// GGG_noFood_during3
	"smiles broadly, revealing his pearly whites. Er, greens, in this case.", 						// GGG_noFood_after1
	"smiles broadly, ectoplasm dripping from the corners"); 										// GGG_noFood_after2
	
// Find the appropriate text
var attackText = new Array;
var j = 0;

var images = document.getElementsByTagName('img');
for (var i = 0; i < images.length; i++) {
	if (images[i].getAttribute('src').indexOf("/images/itemimages/ghobo.gif") > -1 || images[i].getAttribute('src').indexOf("/images/itemimages/ggg.gif") > -1) {
		attackText[j] = images[i].parentNode.parentNode.lastChild;
		j++;
	}
}

var textIndex = -1;
var notifierIndex = -1;

for (var i = 0; i < attackText.length; i++) {
	
	var msg = attackText[i].innerHTML;
	
	for (var j = 0; j < notifiers.length; j++) {
		if (msg.indexOf(notifiers[j]) > -1) {
			textIndex = i;
			notifierIndex = j;
			break;
		}
	}
	if (textIndex != -1 && notifierIndex != -1) {
		break;
	}
}

var newText;
var textNode;

if (textIndex != -1) {
	textNode = attackText[textIndex];
	
	newText = document.createElement('td');
	newText.style.color = "red";
	newText.style.fontWeight = "bold";
	newText.setAttribute('colspan',2);
	newText.setAttribute('align','center');
	
	// Hobo_noBooze
	if (notifierIndex == 0) {
		newText.innerHTML = "(out of booze!)";
	}
	// Hobo_lastBooze
	else if (notifierIndex == 1) {
		newText.innerHTML = "(last booze!)";
	}
	// GGG_noFood_during
	else if (notifierIndex >= 2 && notifierIndex <= 4) {
		newText.innerHTML = "(warning: few or no charges remaining, may steal food drops!)";
	}
	else if (notifierIndex >= 5 && notifierIndex < notifiers.length) {
		newText.innerHTML = "(out of food!)";
	}
	
	textNode.parentNode.parentNode.appendChild(newText);
}