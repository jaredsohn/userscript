// ==UserScript==
// @name           Waste of Time-O-Meter v2
// @description    Counts the amount of time you spend on GameFAQs and adds it to the page.
// @include        http://www.gamefaqs.com/*
// @include        http://boards.gamefaqs.com/gfaqs/*
// ==/UserScript==

(function () {

scriptIsActive = 0;

GM_registerMenuCommand("Reset Time Count", resetTime);
GM_registerMenuCommand("Reset Active Count", resetActive);

function timeStr(){
	seconds = GM_getValue('wot_seconds');
	minutes = GM_getValue('wot_minutes');
	hours = GM_getValue('wot_hours');

	string = seconds;
	if (10 > seconds) { string = '0'+string }
	string = minutes+':'+string;
	if (10 > minutes) { string = '0'+string }
	string = hours+':'+string;
	return string;
}

function createTimeCount(){

	timeCount = document.createElement('div');
	timeCount.innerHTML = '<span style="font: 0.8em Arial, Helvetica, sans-serif; font-weight: bold;" id="wot_timecount">' + timeStr(); + '</span>';
	
	if ( !document.getElementById('wot_timecount')) 
	{
		if ( x = document.getElementById('welcometext') ) {
			x . appendChild(timeCount);
		} else {
		
			bElements = document.getElementsByTagName('b')
			bElements[0].appendChild(timeCount);

		}
	}
}

function countTime() {
	if (GM_getValue('wot_active') == 0 && scriptIsActive == 0) {
		GM_setValue('wot_active', (GM_getValue('wot_active') + 1));
		scriptIsActive = 1;
	}

	if (GM_getValue('wot_active') > 1 && scriptIsActive == 1) {
		GM_setValue('wot_active', (GM_getValue('wot_active') - 1));
		scriptIsActive = 0;
	}

	if (scriptIsActive) {
		if (GM_getValue('wot_seconds') == 59) {
			GM_setValue('wot_seconds', 0);
			if (GM_getValue('wot_minutes') == 59) {
				GM_setValue('wot_minutes', 0);
				GM_setValue('wot_hours', (GM_getValue('wot_hours') + 1));
			} else {
				GM_setValue('wot_minutes', (GM_getValue('wot_minutes') + 1));
			}
		} else {
			GM_setValue('wot_seconds', (GM_getValue('wot_seconds') + 1));
		}
	}

	wot_timecount = document.getElementById('wot_timecount');
	wot_timecount.innerHTML = timeStr();
}

function resetTime(){
	GM_setValue('wot_seconds', 0);
	GM_setValue('wot_minutes', 0);
	GM_setValue('wot_hours', 0);
}

function resetActive(){
	GM_setValue('wot_active', 0);
}

function scriptEnd() {
	if (scriptIsActive) {
		GM_setValue('wot_active', 0);
	}
}

if (!GM_getValue('wot_active')) {
	GM_setValue('wot_active', 0);
}

if (!GM_getValue('wot_init')) {
	GM_setValue('wot_init', 1);
	resetTime();
}

createTimeCount();
setInterval(countTime, 1000);
window.addEventListener('unload', scriptEnd, false);

})();