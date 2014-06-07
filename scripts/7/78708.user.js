// ==UserScript==
// @name           Wowhead Gearscore
// @namespace      EDB_gm
// @description    Adds an item's gearscore to its Wowhead page.
// @include        *wowhead.com/item=*
// ==/UserScript==

function singleToInt(sString) {
	switch(sString) {
		case "0": return 0;
		break;
		case "1": return 1;
		break;
		case "2": return 2;
		break;
		case "3": return 3;
		break;
		case "4": return 4;
		break;
		case "5": return 5;
		break;
		case "6": return 6;
		break;
		case "7": return 7;
		break;
		case "8": return 8;
		break;
		case "9": return 9;
		break;
		default: return 0;
		break;
	}
}

function pow(whatPow, toPow) {
	var e = whatPow;
	var x = toPow;
	var tempValue = 1;
	while (x >= 1) {
		tempValue = tempValue*e;
		x--;
	}
	return tempValue;
}

function toInt(tString) {
	var i = tString.length;
	var n = 1;
	var m = 0;
	var l = 1;
	var result = 0;
	while(i>=n) {
		var digit = (singleToInt(tString.substring(i-n, i-m)) * (pow(10, l)/10));
		result = result + digit;
		l++;
		n++;
		m++;
	}
	return result;
}

var itemData;
var iQuality;
var iSlotId;
var iLevel;
var Scale = 1.8618;
var qualityScale = 1;

//Determing slot type and whether or not this is a GS-able item
iSlotId = document.getElementsByClassName("text").item(0).innerHTML;
iSlotId = iSlotId.substring(iSlotId.indexOf("pr_showClassPresetMenu("));
iSlotId = iSlotId.substring(iSlotId.indexOf(",event)")-2, iSlotId.indexOf(",event)")).replace(",", "");

function getSlot() {
	switch(iSlotId) {
		case "1": return 1.0000; //Head
		break;
		case "2": return 0.5625; //Neck
		break;
		case "3": return 0.7500; //Shoulder
		break;
		case "5": return 1.0000; //Chest
		break;
		case "6": return 0.7500; //Waist
		break;
		case "7": return 1.0000; //Legs
		break;
		case "8": return 0.75; //Feet
		break;
		case "9": return 0.5625; //Wrist
		break;
		case "10": return 0.7500; //Hands
		break;
		case "11": return 0.5625; //Finger
		break;
		case "12": return 0.5625; //Trinket
		break;
		case "13": return 1.0000; //One Hand
		break;
		case "14": return 1.0000; //Shield
		break;
		case "15": return 0.3164; //Ranged
		break;
		case "16": return 0.5625; //Back
		break;
		case "17": return 2.000; //Two Hand
		break;
		case "21": return 1.0000; //Main Hand
		break;
		case "22": return 1.0000; //Off Hand
		break;
		case "23": return 1.0000; //Held in Off Hand
		break;
		case "25": return 0.3164; //Thrown
		break;
		case "28": return 0.3164; //Relic
		break;
		default: return 0; //Shirt, Bag, Tabard, etc.
		break;
	}
}



itemData = document.getElementById("main-contents").getElementsByTagName("script").item(2).innerHTML;

iRarity = itemData.substring(itemData.indexOf(",quality:")+9, itemData.indexOf(",icon:"));
iRarity = toInt(iRarity);

iLevel = itemData.substring(itemData.indexOf("Item Level "));
iLevel = iLevel.substring(11, iLevel.indexOf("<"));
iLevel = toInt(iLevel);

if (iRarity == 7) {
	iRarity = 3;
	iLevel = 187.05;
}
if (iRarity == 5) {
	iRarity = 4;
	qualityScale = 1.3;
}
if (iRarity == 0 || iRarity == 1) {
	iRarity = 2;
	qualityScale = 0.005;
}

if (iLevel > 120) {
	switch (iRarity) {
		case 4: var AB = ["91.4500", "0.6500"];
		break;
		case 3: var AB = ["81.3750", "0.8125"];
		break;
		case 2: var AB = ["73.0000", "1.0000"];
		break;
		default:;
		break;
	}
} else {
		switch (iRarity) {
		case 4: var AB = ["26.0000", "1.2000"];
		break;
		case 3: var AB = ["0.7500", "1.8000"];
		break;
		case 2: var AB = ["8.0000", "2.0000"];
		break;
		case 1: var AB = ["0.0000", "2.2500"];
		break;
		default:;
		break;
	}
}

if (iRarity >= 2 && iRarity <=4) {

	var GearScore = Math.floor(( (iLevel - AB[0]) / AB[1]) * getSlot() * Scale * qualityScale);

	var insertLoc = document.getElementById("infobox-quick-facts");

	if (getSlot() != 0) {
		insertLoc.innerHTML = "Quick Facts<br/><font color='#FF8C00'>GearScore: " + GearScore + "</font>";
	}
}