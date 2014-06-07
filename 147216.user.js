
// ==UserScript==
	// @name			Syrnia auto eat script
	// @namespace		        Syrniaa
	// @author			Private
	// @include			http://www.syrnia.com/game.php
	// @version			1.3a
	// @description			The cheat used by mod Evert
// ==/UserScript==


var autoEat = true;
var foodId = 45982948;
var minHp = 8;
var messageChannel = 5;

function checkHps() {
	if (needToEat()) {
		message("*********Auto eating food***********");
		unsafeWindow.useItem(foodId, 'F');
	}
	if (autoEat) setTimeout(checkHps, 4000);
}

function needToEat() {
	var hps = getHps();
	return hps<minHp;
}

function getHps() {
	var hps = parseInt(unsafeWindow.$('statsHPText').innerHTML);
	//message("Hps: "+hps);
	return hps;
}

function message(txt) {
	unsafeWindow.addChat(messageChannel, txt);
}

if (autoEat) checkHps();
unsafeWindow.messagePopup("Everts auto eating script","Active!");
