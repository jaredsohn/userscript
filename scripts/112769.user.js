// ==UserScript==
	// @name			Syrnia auto eat script
	// @namespace		        Syrnia2
	// @author			Private
	// @include			http://www.syrnia.com/game.php
	// @version			1.4
	// @description			Same as old script but less functions
// ==/UserScript==


var autoEat = true;
var foodId = 38823660;
var minHp = 8;
var messageChannel = 5;

function checkHps() {
	if (needToEat()) {
		unsafeWindow.useItem(foodId, 'F');
	}
	if (autoEat) setTimeout(checkHps, 7000);
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

if (autoEat) checkHps();