// ==UserScript==
	// @name			Audible Botcheck Alarm
	// @namespace		        Audible Botcheck Alarm
	// @author			Syrnia
	// @include			http://www.syrnia.com/game.php
	// @version			1.0
	// @description			Audible botcheck alarm
// ==/UserScript==

function checkBotcheck() {
	if (unsafeWindow.$('botImage')!=null) {
		window.open('http://syrnia.000a.biz/alarm.html','alarm,width=200','height=200');
		setTimeout(checkBotcheck, 450000);
	} else {
		setTimeout(checkBotcheck, 10000);
	}
}

checkBotcheck();
unsafeWindow.messagePopup("Botcheck alarm activated!","Alarm");
