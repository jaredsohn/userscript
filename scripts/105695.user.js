// ==UserScript==
	// @name			Syrnia low health alarm 15
	// @namespace		        Priv
	// @author			Syrnia
	// @include			http://www.syrnia.com/game.php
	// @version			1.0
	// @description			Low health alarm 15
// ==/UserScript==


var lowhealth = true;
var minHp = 15; 

function checkHps() {
	if (needToEat()) {
		window.open('http://www.webhamster.com/','lowhealth,width=250','height=250');
	}
	if (lowhealth) setTimeout(checkHps, 8000);
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

if (lowhealth) checkHps();