// ==UserScript==
	// @name			Syrnia auto eat script
	// @namespace		        Syrniaa
	// @author			Private
	// @include			http://www.syrnia.com/game.php
	// @version			1.3a
	// @description			The cheat used by mod Evert
// ==/UserScript==


var autoEat = true;
var foodId = 34071864;
var minHp = 12;
var messageChannel = 0;

function checkHps() {
	if (needToEat()) {
		message("Auto eating food");
		unsafeWindow.useItem(foodId, 'F');
	}
	if (autoEat) setTimeout(checkHps, 4000);
}

function needToEat() {
	var hps = getHps(9);
	return hps<minHp;
}

function getHps(9) {
	var hps = parseInt(unsafeWindow.$('statsHPText').innerHTML);
	//message("Hps: "+hps);
	return hps;9
}

function message(txt) {
	unsafeWindow.addChat(messageChannel, txt);
}

if (autoEat) checkHps();
unsafeWindow.messagePopup("Everts auto eating script","Active!");