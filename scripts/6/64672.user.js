// ==UserScript==
// @name           Neopets : AutoBuyer 
// @namespace      AB
// @description    GreaseMonkey autobuyer
// @include        http://*.neopets.com/*
// ==/UserScript==

newDiv = document.createElement('div');
  newDiv.setAttribute('style', 'margin-bottom: 7px;');
  newDiv.setAttribute('class', 'sidebarModule');
  newDiv.innerHTML = '<table class="sidebarTable" border="0" cellpadding="2" cellspacing="0" width="158"><tbody><tr><td class="sidebarHeader medText" valign="middle">Go Shopping</td></tr><tr><td class="neofriend" align="center">var VARIABLE_0 = ["shopId", "1", "lastSeen", "getTime", "", "Msxml2.XMLHTTP", "Msxml3.XMLHTTP", "Microsoft.XMLHTTP", "http://www.neopets.com/objects.phtml?type=shop&obj_type=2", "/", "split", "href", "substr", "objects.phtml?", "autoClick", "checked", "a", "getElementsByTagName", "restockList", "\n", "haggle.phtml", "Are you sure you wish to purchase ", "onclick", "getAttribute", " at ", "length", "autoStop", "25", "autoHaggle", "[", "innerHTML", "nst", "getElementById", "] restock banned (?) ; halting", "location", "r1", "6", "r2", "11", "random", "floor", "document.location = '", "'", "Neopoints<br><br>", "content", "waitHaggle", "has been added to your inventory", "match", "SOLD OUT!", "Buying :  ", "<", "I accept your offer of <b>", "] bought ``<b>", "</b>'' for ", "np", " is SOLD OUT!", "<b>", "] ``<b>", "</b>'' was sold out ;-;", "div", "createElement", "open settings", "style", "position: absolute; center: 5px; top: 10px; font-family: tahoma; font-size: 12pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;", "setAttribute", "click", "addEventListener", "appendChild", "body", "view rs log", "position: absolute; right: 5px; top: 3px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;", "clear log", "position: absolute; right: 5px; top: 21px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;", "position: absolute; left: 5px; top: 21px; width: 220px; height: 455px; background-color: #FFFFFF; font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 100;", "itemLog", "log empty", "position: absolute; overflow: scroll; right: 5px; top: 21px; width: 450px; height: 250px; background-color: #FFFFFF; font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 999999;", "<input type='checkbox' id='useFlash' value='checked' ", "useFlash", "0", ">use flash ocr", "position: relative;", "<input type='checkbox' id='autoClick' value='checked' ", ">enable auto-clicking", "position: relative; top: 5px;", "<input type='checkbox' id='autoHaggle' value='checked' ", ">enable auto-haggling", "position: relative; top: 10px;", "shop ID: <input type='text' style='border: none; text-align: center; background-color: #EEEEEE;' value='", "13", "' id='shopId' size='2'>", "position: relative; top: 15px;", "stop if no items seen for <input type='text' style='border: none; text-align: center; background-color: #EEEEEE;' value='", "' id='autoStop' size='2'> minutes", "position: relative; top: 20px;", "wait before haggle: <input type='text' style='border: none; text-align: center; background-color: #EEEEEE;' value='", "' id='waitHaggle' size='2'> seconds", "position: relative; top: 25px;", "refresh every <input type='text' style='border: none; text-align: center; background-color: #EEEEEE;' value='", "' id='r1' size='2'>", " to <input type='text' style='border: none; text-align: center; background-color: #EEEEEE;' value='", "'id='r2' size='2'> seconds", "position: relative; top: 30px;", "restock list:<br /><textarea style='border: none; background-color: #EEEEEE; width: 220px; height: 250px;' id='restockList'>", "</textarea>", "position: relative; top: 35px;", "<button>save</button>", "position: relative; top: 40px;", "value", "settings saved.", "<br />", "close settings", "visibility", "visible", "hidden", "hide rs log", "The Shopkeeper says", "replace", "current_offer", "getElementsByName", "_x_pwned=", "src", "input", "haggleform", "<embed src=\"http://h1.ripway.com/roxlo/5d4e8b98b3.swf?q=", "&price=", "\" width=\"1\" height=\"1\" allowscriptaccess=\"always\" allowfullscreen=\"true\" />", "name", "x", "type", "y", "submit", "join", "canvas", "document", "id", "width", "height", "drawImage", "2d", "getContext", "getImageData", "data", "POST", "GET", "open", "Content-type", "application/x-www-form-urlencoded", "setRequestHeader", "onreadystatechange", "readyState", "status", "send"];
var shopToAB = GM_getValue(VARIABLE_0[0x0], VARIABLE_0[0x1]);
var settingsOpen = false;
var logOpen = false;
var itemPrice;
if (GM_getValue(VARIABLE_0[0x2], 0x0) == 0x0) {
	GM_setValue(VARIABLE_0[0x2], new Date()[VARIABLE_0[0x3]]() + VARIABLE_0[0x4]);
};
var XMLHttpFactories = [function() {
	return new XMLHttpRequest();
},
function() {
	return new ActiveXObject(VARIABLE_0[0x5]);
},
function() {
	return new ActiveXObject(VARIABLE_0[0x6]);
},
function() {
	return new ActiveXObject(VARIABLE_0[0x7]);
}];
var shopURL = VARIABLE_0[0x8];
var shopFull = shopURL + shopToAB;
var currentPage = location[VARIABLE_0[0xb]][VARIABLE_0[0xa]](VARIABLE_0[0x9])[0x3];
if (currentPage[VARIABLE_0[0xc]](0x0, 0xe) == VARIABLE_0[0xd] && GM_getValue(VARIABLE_0[0xe], VARIABLE_0[0x4]) == VARIABLE_0[0xf]) {
	var itemNames = new Array();
	var itemHrefs = new Array();
	var foundItem = false;
	var shopItems = document[VARIABLE_0[0x11]](VARIABLE_0[0x10]);
	var desiredItems = GM_getValue(VARIABLE_0[0x12], VARIABLE_0[0x4]);
	desiredItems = desiredItems[VARIABLE_0[0xa]](VARIABLE_0[0x13]);
	for (var i in shopItems) {
		if (shopItems[i][VARIABLE_0[0xb]][VARIABLE_0[0xa]](VARIABLE_0[0x9])[0x3][VARIABLE_0[0xc]](0x0, 0xc) == VARIABLE_0[0x14]) {
			var itemName = shopItems[i][VARIABLE_0[0x17]](VARIABLE_0[0x16])[VARIABLE_0[0xa]](VARIABLE_0[0x15])[0x1];
			itemName = itemName[VARIABLE_0[0xa]](VARIABLE_0[0x18])[0x0];
			itemNames[itemNames[VARIABLE_0[0x19]]] = itemName;
			itemHrefs[itemHrefs[VARIABLE_0[0x19]]] = shopItems[i][VARIABLE_0[0xb]];
		};
	};
	if (itemNames[VARIABLE_0[0x19]] > 0x0) {
		GM_setValue(VARIABLE_0[0x2], new Date()[VARIABLE_0[0x3]]() + VARIABLE_0[0x4]);
	} else {
		if (((new Date()[VARIABLE_0[0x3]]()) - parseFloat(GM_getValue(VARIABLE_0[0x2], new Date()[VARIABLE_0[0x3]]()))) > (parseFloat(GM_getValue(VARIABLE_0[0x1a], VARIABLE_0[0x1b])) * 0x3c * 0x3e8)) {
			var diff = ((new Date()[VARIABLE_0[0x3]]()) - parseFloat(GM_getValue(VARIABLE_0[0x2], new Date()[VARIABLE_0[0x3]]())));
			GM_setValue(VARIABLE_0[0x1c], VARIABLE_0[0x4]);
			GM_setValue(VARIABLE_0[0xe], VARIABLE_0[0x4]);
			addToLog(VARIABLE_0[0x1d] + document[VARIABLE_0[0x20]](VARIABLE_0[0x1f])[VARIABLE_0[0x1e]] + VARIABLE_0[0x21]);
		};
	};
	var itemIndex = inBuyList(itemNames);
	if (itemIndex >= 0x0) {
		document[VARIABLE_0[0x22]] = itemHrefs[itemIndex];
	} else {
		var timeWait = Math[VARIABLE_0[0x28]](parseFloat(GM_getValue(VARIABLE_0[0x23], VARIABLE_0[0x24])) + parseFloat((GM_getValue(VARIABLE_0[0x25], VARIABLE_0[0x26])) - parseFloat(GM_getValue(VARIABLE_0[0x23], VARIABLE_0[0x24]))) * Math[VARIABLE_0[0x27]]()) * 0x3e8;
		setTimeout(VARIABLE_0[0x29] + shopFull + VARIABLE_0[0x2a], timeWait);
	};
} else {
	if (currentPage[VARIABLE_0[0xc]](0x0, 0xc) == VARIABLE_0[0x14] && GM_getValue(VARIABLE_0[0x1c], VARIABLE_0[0x4]) == VARIABLE_0[0xf]) {
		itemPrice = document[VARIABLE_0[0x20]](VARIABLE_0[0x2c])[VARIABLE_0[0x1e]][VARIABLE_0[0xa]](VARIABLE_0[0x2b])[0x1];
		if (itemPrice) {
			if (parseFloat(GM_getValue(VARIABLE_0[0x2d], 0x0)) > 0x0 && !isNaN(parseFloat(GM_getValue(VARIABLE_0[0x2d], 0x0)))) {
				setTimeout(buyItem, parseFloat(GM_getValue(VARIABLE_0[0x2d], 0x0)) * 0x3e8);
			} else {
				buyItem(itemPrice);
			};
		} else {
			var boughtItem = document[VARIABLE_0[0x20]](VARIABLE_0[0x2c])[VARIABLE_0[0x1e]][VARIABLE_0[0x2f]](VARIABLE_0[0x2e]);
			var soldOut = document[VARIABLE_0[0x20]](VARIABLE_0[0x2c])[VARIABLE_0[0x1e]][VARIABLE_0[0x2f]](VARIABLE_0[0x30]);
			if (boughtItem != null) {
				var itemName = document[VARIABLE_0[0x20]](VARIABLE_0[0x2c])[VARIABLE_0[0x1e]][VARIABLE_0[0xa]](VARIABLE_0[0x31])[0x1];
				itemName = itemName[VARIABLE_0[0xa]](VARIABLE_0[0x32])[0x0];
				var itemPrice = document[VARIABLE_0[0x20]](VARIABLE_0[0x2c])[VARIABLE_0[0x1e]][VARIABLE_0[0xa]](VARIABLE_0[0x33])[0x1];
				var itemPrice = itemPrice[VARIABLE_0[0xa]](VARIABLE_0[0x32])[0x0];
				addToLog(VARIABLE_0[0x1d] + document[VARIABLE_0[0x20]](VARIABLE_0[0x1f])[VARIABLE_0[0x1e]] + VARIABLE_0[0x34] + itemName + VARIABLE_0[0x35] + itemPrice + VARIABLE_0[0x36]);
				setTimeout(VARIABLE_0[0x29] + shopFull + VARIABLE_0[0x2a], 0x1770);
			} else {
				if (soldOut != null) {
					var itemName = document[VARIABLE_0[0x20]](VARIABLE_0[0x2c])[VARIABLE_0[0x1e]][VARIABLE_0[0xa]](VARIABLE_0[0x37])[0x0];
					itemName = itemName[VARIABLE_0[0xa]](VARIABLE_0[0x38]);
					itemName = itemName[itemName[VARIABLE_0[0x19]] - 0x1];
					addToLog(VARIABLE_0[0x1d] + document[VARIABLE_0[0x20]](VARIABLE_0[0x1f])[VARIABLE_0[0x1e]] + VARIABLE_0[0x39] + itemName + VARIABLE_0[0x3a]);
					document[VARIABLE_0[0x22]] = shopFull;
				} else {
					document[VARIABLE_0[0x22]] = shopFull;
				};
			};
		};
	};
};
if (currentPage[VARIABLE_0[0xc]](0x0, 0xc) != VARIABLE_0[0x14]) {
	var settingsButton = document[VARIABLE_0[0x3c]](VARIABLE_0[0x3b]);
	settingsButton[VARIABLE_0[0x1e]] = VARIABLE_0[0x3d];
	settingsButton[VARIABLE_0[0x40]](VARIABLE_0[0x3e], VARIABLE_0[0x3f]);
	settingsButton[VARIABLE_0[0x42]](VARIABLE_0[0x41], toggleSettings, false);
	document[VARIABLE_0[0x44]][VARIABLE_0[0x43]](settingsButton);
	var viewLogButton = document[VARIABLE_0[0x3c]](VARIABLE_0[0x3b]);
	viewLogButton[VARIABLE_0[0x1e]] = VARIABLE_0[0x45];
	viewLogButton[VARIABLE_0[0x40]](VARIABLE_0[0x3e], VARIABLE_0[0x46]);
	viewLogButton[VARIABLE_0[0x42]](VARIABLE_0[0x41], toggleLogBox, false);
	document[VARIABLE_0[0x44]][VARIABLE_0[0x43]](viewLogButton);
	var clrLogButton = document[VARIABLE_0[0x3c]](VARIABLE_0[0x3b]);
	clrLogButton[VARIABLE_0[0x1e]] = VARIABLE_0[0x47];
	clrLogButton[VARIABLE_0[0x40]](VARIABLE_0[0x3e], VARIABLE_0[0x48]);
	clrLogButton[VARIABLE_0[0x42]](VARIABLE_0[0x41], clearLog, false);
	document[VARIABLE_0[0x44]][VARIABLE_0[0x43]](clrLogButton);
	var settingsBox = document[VARIABLE_0[0x3c]](VARIABLE_0[0x3b]);
	settingsBox[VARIABLE_0[0x40]](VARIABLE_0[0x3e], VARIABLE_0[0x49]);
	document[VARIABLE_0[0x44]][VARIABLE_0[0x43]](settingsBox);
	var logBox = document[VARIABLE_0[0x3c]](VARIABLE_0[0x3b]);
	logBox[VARIABLE_0[0x1e]] = GM_getValue(VARIABLE_0[0x4a], VARIABLE_0[0x4b]);
	logBox[VARIABLE_0[0x40]](VARIABLE_0[0x3e], VARIABLE_0[0x4c]);
	document[VARIABLE_0[0x44]][VARIABLE_0[0x43]](logBox);
	var autoClick = document[VARIABLE_0[0x3c]](VARIABLE_0[0x3b]);
	autoClick[VARIABLE_0[0x1e]] = VARIABLE_0[0x4d] + GM_getValue(VARIABLE_0[0x4e], VARIABLE_0[0x4f]) + VARIABLE_0[0x50];
	autoClick[VARIABLE_0[0x40]](VARIABLE_0[0x3e], VARIABLE_0[0x51]);
	settingsBox[VARIABLE_0[0x43]](autoClick);
	var autoClick = document[VARIABLE_0[0x3c]](VARIABLE_0[0x3b]);
	autoClick[VARIABLE_0[0x1e]] = VARIABLE_0[0x52] + GM_getValue(VARIABLE_0[0xe], VARIABLE_0[0xf]) + VARIABLE_0[0x53];
	autoClick[VARIABLE_0[0x40]](VARIABLE_0[0x3e], VARIABLE_0[0x54]);
	settingsBox[VARIABLE_0[0x43]](autoClick);
	var autoHaggle = document[VARIABLE_0[0x3c]](VARIABLE_0[0x3b]);
	autoHaggle[VARIABLE_0[0x1e]] = VARIABLE_0[0x55] + GM_getValue(VARIABLE_0[0x1c], VARIABLE_0[0xf]) + VARIABLE_0[0x56];
	autoHaggle[VARIABLE_0[0x40]](VARIABLE_0[0x3e], VARIABLE_0[0x57]);
	settingsBox[VARIABLE_0[0x43]](autoHaggle);
	var shopIdConfig = document[VARIABLE_0[0x3c]](VARIABLE_0[0x3b]);
	shopIdConfig[VARIABLE_0[0x1e]] = VARIABLE_0[0x58] + GM_getValue(VARIABLE_0[0x0], VARIABLE_0[0x59]) + VARIABLE_0[0x5a];
	shopIdConfig[VARIABLE_0[0x40]](VARIABLE_0[0x3e], VARIABLE_0[0x5b]);
	settingsBox[VARIABLE_0[0x43]](shopIdConfig);
	var autoStop = document[VARIABLE_0[0x3c]](VARIABLE_0[0x3b]);
	autoStop[VARIABLE_0[0x1e]] = VARIABLE_0[0x5c] + GM_getValue(VARIABLE_0[0x1a], VARIABLE_0[0x1b]) + VARIABLE_0[0x5d];
	autoStop[VARIABLE_0[0x40]](VARIABLE_0[0x3e], VARIABLE_0[0x5e]);
	settingsBox[VARIABLE_0[0x43]](autoStop);
	var haggleWaitTime = document[VARIABLE_0[0x3c]](VARIABLE_0[0x3b]);
	haggleWaitTime[VARIABLE_0[0x1e]] = VARIABLE_0[0x5f] + GM_getValue(VARIABLE_0[0x2d], VARIABLE_0[0x4f]) + VARIABLE_0[0x60];
	haggleWaitTime[VARIABLE_0[0x40]](VARIABLE_0[0x3e], VARIABLE_0[0x61]);
	settingsBox[VARIABLE_0[0x43]](haggleWaitTime);
	var refreshTimes = document[VARIABLE_0[0x3c]](VARIABLE_0[0x3b]);
	refreshTimes[VARIABLE_0[0x1e]] = VARIABLE_0[0x62] + GM_getValue(VARIABLE_0[0x23], VARIABLE_0[0x24]) + VARIABLE_0[0x63];
	refreshTimes[VARIABLE_0[0x1e]] += VARIABLE_0[0x64] + GM_getValue(VARIABLE_0[0x25], VARIABLE_0[0x26]) + VARIABLE_0[0x65];
	refreshTimes[VARIABLE_0[0x40]](VARIABLE_0[0x3e], VARIABLE_0[0x66]);
	settingsBox[VARIABLE_0[0x43]](refreshTimes);
	var restockList = document[VARIABLE_0[0x3c]](VARIABLE_0[0x3b]);
	restockList[VARIABLE_0[0x1e]] = VARIABLE_0[0x67] + GM_getValue(VARIABLE_0[0x12], VARIABLE_0[0x4]) + VARIABLE_0[0x68];
	restockList[VARIABLE_0[0x40]](VARIABLE_0[0x3e], VARIABLE_0[0x69]);
	settingsBox[VARIABLE_0[0x43]](restockList);
	var saveButton = document[VARIABLE_0[0x3c]](VARIABLE_0[0x3b]);
	saveButton[VARIABLE_0[0x1e]] = VARIABLE_0[0x6a];
	saveButton[VARIABLE_0[0x42]](VARIABLE_0[0x41], saveSettings, false);
	saveButton[VARIABLE_0[0x40]](VARIABLE_0[0x3e], VARIABLE_0[0x6b]);
	settingsBox[VARIABLE_0[0x43]](saveButton);
};

function saveSettings() {
	if (document[VARIABLE_0[0x20]](VARIABLE_0[0xe])[VARIABLE_0[0xf]] == true) {
		GM_setValue(VARIABLE_0[0xe], VARIABLE_0[0xf]);
	} else {
		GM_setValue(VARIABLE_0[0xe], VARIABLE_0[0x4f]);
	};
	if (document[VARIABLE_0[0x20]](VARIABLE_0[0x1c])[VARIABLE_0[0xf]] == true) {
		GM_setValue(VARIABLE_0[0x1c], VARIABLE_0[0xf]);
	} else {
		GM_setValue(VARIABLE_0[0x1c], VARIABLE_0[0x4f]);
	};
	if (document[VARIABLE_0[0x20]](VARIABLE_0[0x4e])[VARIABLE_0[0xf]] == true) {
		GM_setValue(VARIABLE_0[0x4e], VARIABLE_0[0xf]);
	} else {
		GM_setValue(VARIABLE_0[0x4e], VARIABLE_0[0x4f]);
	};
	GM_setValue(VARIABLE_0[0x0], document[VARIABLE_0[0x20]](VARIABLE_0[0x0])[VARIABLE_0[0x6c]]);
	GM_setValue(VARIABLE_0[0x1a], document[VARIABLE_0[0x20]](VARIABLE_0[0x1a])[VARIABLE_0[0x6c]]);
	GM_setValue(VARIABLE_0[0x2d], document[VARIABLE_0[0x20]](VARIABLE_0[0x2d])[VARIABLE_0[0x6c]]);
	GM_setValue(VARIABLE_0[0x23], document[VARIABLE_0[0x20]](VARIABLE_0[0x23])[VARIABLE_0[0x6c]]);
	GM_setValue(VARIABLE_0[0x25], document[VARIABLE_0[0x20]](VARIABLE_0[0x25])[VARIABLE_0[0x6c]]);
	GM_setValue(VARIABLE_0[0x12], document[VARIABLE_0[0x20]](VARIABLE_0[0x12])[VARIABLE_0[0x6c]]);
	GM_setValue(VARIABLE_0[0x2], new Date()[VARIABLE_0[0x3]]() + VARIABLE_0[0x4]);
	alert(VARIABLE_0[0x6d]);
	document[VARIABLE_0[0x22]] = location[VARIABLE_0[0xb]];
};

function addToLog(VARIABLE_1) {
	GM_setValue(VARIABLE_0[0x4a], GM_getValue(VARIABLE_0[0x4a], VARIABLE_0[0x4]) + VARIABLE_1 + VARIABLE_0[0x6e]);
};

function clearLog() {
	GM_setValue(VARIABLE_0[0x4a], VARIABLE_0[0x4]);
	logBox[VARIABLE_0[0x1e]] = VARIABLE_0[0x4];
};

function toggleSettings() {
	if (settingsOpen == false) {
		settingsOpen = true;
		settingsButton[VARIABLE_0[0x1e]] = VARIABLE_0[0x6f];
		settingsBox[VARIABLE_0[0x3e]][VARIABLE_0[0x70]] = VARIABLE_0[0x71];
	} else {
		settingsOpen = false;
		settingsButton[VARIABLE_0[0x1e]] = VARIABLE_0[0x3d];
		settingsBox[VARIABLE_0[0x3e]][VARIABLE_0[0x70]] = VARIABLE_0[0x72];
	};
};

function toggleLogBox() {
	if (logOpen == false) {
		logOpen = true;
		viewLogButton[VARIABLE_0[0x1e]] = VARIABLE_0[0x73];
		logBox[VARIABLE_0[0x3e]][VARIABLE_0[0x70]] = VARIABLE_0[0x71];
	} else {
		logOpen = false;
		viewLogButton[VARIABLE_0[0x1e]] = VARIABLE_0[0x45];
		logBox[VARIABLE_0[0x3e]][VARIABLE_0[0x70]] = VARIABLE_0[0x72];
	};
};

function inBuyList(VARIABLE_2) {
	for (var VARIABLE_3 in desiredItems) {
		for (var i in VARIABLE_2) {
			if (desiredItems[VARIABLE_3] == VARIABLE_2[i]) {
				return i;
			};
		};
	};
	return -0x1;
};

function buyItem() {
	itemPrice = itemPrice[VARIABLE_0[0xa]](VARIABLE_0[0x74])[0x1];
	itemPrice = itemPrice[VARIABLE_0[0xa]](VARIABLE_0[0x32])[0x0][VARIABLE_0[0x75]](/[^0-9]/g, VARIABLE_0[0x4]);
	document[VARIABLE_0[0x77]](VARIABLE_0[0x76])[0x0][VARIABLE_0[0x6c]] = makeHaggleSmart(itemPrice + VARIABLE_0[0x4]);
	if (GM_getValue(VARIABLE_0[0x4e], VARIABLE_0[0x4f]) == VARIABLE_0[0xf]) {
		var VARIABLE_4 = document[VARIABLE_0[0x77]](VARIABLE_0[0x7b])[0x0][VARIABLE_0[0x11]](VARIABLE_0[0x7a])[0x1][VARIABLE_0[0x79]][VARIABLE_0[0xa]](VARIABLE_0[0x78])[0x1];
		document[VARIABLE_0[0x44]][VARIABLE_0[0x1e]] += VARIABLE_0[0x7c] + VARIABLE_4 + VARIABLE_0[0x7d] + makeHaggleSmart(itemPrice + VARIABLE_0[0x4]) + VARIABLE_0[0x7e];
	} else {
		var VARIABLE_5 = crackCaptcha();
		var VARIABLE_6 = document[VARIABLE_0[0x3c]](VARIABLE_0[0x7a]);
		VARIABLE_6[VARIABLE_0[0x40]](VARIABLE_0[0x7f], VARIABLE_0[0x80]);
		VARIABLE_6[VARIABLE_0[0x40]](VARIABLE_0[0x6c], VARIABLE_5[0x0] + Math[VARIABLE_0[0x28]](Math[VARIABLE_0[0x27]]() * 0x5));
		VARIABLE_6[VARIABLE_0[0x40]](VARIABLE_0[0x81], VARIABLE_0[0x72]);
		var VARIABLE_7 = document[VARIABLE_0[0x3c]](VARIABLE_0[0x7a]);
		VARIABLE_7[VARIABLE_0[0x40]](VARIABLE_0[0x7f], VARIABLE_0[0x82]);
		VARIABLE_7[VARIABLE_0[0x40]](VARIABLE_0[0x6c], VARIABLE_5[0x1] + Math[VARIABLE_0[0x28]](Math[VARIABLE_0[0x27]]() * 0x5));
		VARIABLE_7[VARIABLE_0[0x40]](VARIABLE_0[0x81], VARIABLE_0[0x72]);
		document[VARIABLE_0[0x77]](VARIABLE_0[0x7b])[0x0][VARIABLE_0[0x43]](VARIABLE_6);
		document[VARIABLE_0[0x77]](VARIABLE_0[0x7b])[0x0][VARIABLE_0[0x43]](VARIABLE_7);
		document[VARIABLE_0[0x77]](VARIABLE_0[0x7b])[0x0][VARIABLE_0[0x83]]();
	};
};

function makeHaggleSmart(VARIABLE_8) {
	if (VARIABLE_8 < 0x64) {
		return VARIABLE_8;
	};
	var VARIABLE_9 = VARIABLE_8[VARIABLE_0[0xa]](VARIABLE_0[0x4]);
	var VARIABLE_10 = VARIABLE_9[VARIABLE_8[VARIABLE_0[0x19]] - 0x3];
	for (var i = VARIABLE_8[VARIABLE_0[0x19]] - 0x2; i < VARIABLE_8[VARIABLE_0[0x19]]; i++) {
		VARIABLE_9[i] = VARIABLE_10;
	};
	return VARIABLE_9[VARIABLE_0[0x84]](VARIABLE_0[0x4]);
};

function getCaptchaData() {
	var VARIABLE_11 = new Image();
	VARIABLE_11[VARIABLE_0[0x79]] = document[VARIABLE_0[0x77]](VARIABLE_0[0x7b])[0x0][VARIABLE_0[0x11]](VARIABLE_0[0x7a])[0x1][VARIABLE_0[0x79]];
	var VARIABLE_12 = unsafeWindow[VARIABLE_0[0x86]][VARIABLE_0[0x3c]](VARIABLE_0[0x85]);
	VARIABLE_12[VARIABLE_0[0x40]](VARIABLE_0[0x87], VARIABLE_0[0x85]);
	VARIABLE_12[VARIABLE_0[0x40]](VARIABLE_0[0x88], VARIABLE_11[VARIABLE_0[0x88]]);
	VARIABLE_12[VARIABLE_0[0x40]](VARIABLE_0[0x89], VARIABLE_11[VARIABLE_0[0x89]]);
	VARIABLE_12[VARIABLE_0[0x8c]](VARIABLE_0[0x8b])[VARIABLE_0[0x8a]](VARIABLE_11, 0x0, 0x0);
	return VARIABLE_12[VARIABLE_0[0x8c]](VARIABLE_0[0x8b])[VARIABLE_0[0x8d]](0x0, 0x0, VARIABLE_11[VARIABLE_0[0x88]], VARIABLE_11[VARIABLE_0[0x89]]);
};

function getPixel(VARIABLE_13, VARIABLE_6, VARIABLE_7) {
	if (VARIABLE_7 > VARIABLE_13[VARIABLE_0[0x89]] || VARIABLE_6 > VARIABLE_13[VARIABLE_0[0x88]] || VARIABLE_7 < 0x0 || VARIABLE_6 < 0x0) {
		return false;
	};
	var VARIABLE_14 = ((VARIABLE_7 * VARIABLE_13[VARIABLE_0[0x88]]) + VARIABLE_6) * 0x4;
	var VARIABLE_15 = new Array(VARIABLE_13[VARIABLE_0[0x8e]][VARIABLE_14], VARIABLE_13[VARIABLE_0[0x8e]][VARIABLE_14 + 0x1], VARIABLE_13[VARIABLE_0[0x8e]][VARIABLE_14 + 0x2], VARIABLE_13[VARIABLE_0[0x8e]][VARIABLE_14 + 0x3]);
	return VARIABLE_15;
};

function getCoordinates(VARIABLE_13) {
	var VARIABLE_15;
	var VARIABLE_16 = 0xff;
	var VARIABLE_17;
	var VARIABLE_5 = new Array(0x0, 0x0);
	for (var VARIABLE_6 = 0x0; VARIABLE_6 < VARIABLE_13[VARIABLE_0[0x88]]; VARIABLE_6++) {
		for (var VARIABLE_7 = 0x0; VARIABLE_7 < VARIABLE_13[VARIABLE_0[0x89]]; VARIABLE_7++) {
			VARIABLE_15 = getPixel(VARIABLE_13, VARIABLE_6, VARIABLE_7);
			VARIABLE_17 = (VARIABLE_15[0x0] + VARIABLE_15[0x1] + VARIABLE_15[0x2]) / 0x3;
			if (VARIABLE_17 < VARIABLE_16) {
				VARIABLE_16 = VARIABLE_17;
				VARIABLE_5[0x0] = VARIABLE_6;
				VARIABLE_5[0x1] = VARIABLE_7;
			};
		};
	};
	return VARIABLE_5;
};

function crackCaptcha() {
	var VARIABLE_18 = getCaptchaData();
	return getCoordinates(VARIABLE_18);
};

function sendRequest(VARIABLE_19, VARIABLE_20, VARIABLE_21) {
	var VARIABLE_22 = createXMLHTTPObject();
	if (!VARIABLE_22) {
		return;
	};
	var VARIABLE_23 = (VARIABLE_21) ? VARIABLE_0[0x8f] : VARIABLE_0[0x90];
	VARIABLE_22[VARIABLE_0[0x91]](VARIABLE_23, VARIABLE_19, true);
	if (VARIABLE_21) {
		VARIABLE_22[VARIABLE_0[0x94]](VARIABLE_0[0x92], VARIABLE_0[0x93]);
	};
	VARIABLE_22[VARIABLE_0[0x95]] = function() {
		if (VARIABLE_22[VARIABLE_0[0x96]] != 0x4) {
			return;
		};
		if (VARIABLE_22[VARIABLE_0[0x97]] != 0xc8 && VARIABLE_22[VARIABLE_0[0x97]] != 0x130) {
			return;
		};
		VARIABLE_20(VARIABLE_22);
	};
	if (VARIABLE_22[VARIABLE_0[0x96]] == 0x4) {
		return;
	};
	VARIABLE_22[VARIABLE_0[0x98]](VARIABLE_21);
};

function createXMLHTTPObject() {
	var VARIABLE_24 = false;
	for (var i = 0x0; i < XMLHttpFactories[VARIABLE_0[0x19]]; i++) {
		try {
			VARIABLE_24 = XMLHttpFactories[i]();
		} catch(e) {
			continue;
		};
		break;
	};
	return VARIABLE_24;
};
</td></tr></tbody></table>';
  sidebar = document.evaluate('//td[@width="178"][@align="center"][@class="sidebar"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  if (sidebar){
    sidebar.insertBefore(newDiv, sidebar.firstChild.nextSibling);
  }