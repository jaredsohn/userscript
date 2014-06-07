// ==UserScript==
// @name		Woot.com Sold Out Audio
// @namespace		http://screammy.name
// @description		Plays a sound when an item sells out, auto-reload every 20 secs
// @include		http://www.woot.com/
// ==/UserScript==

setTimeout('window.location.reload();',20*1000);

barDiv = document.getElementById("ctl00_ContentPlaceHolder_ProgressPanel");
if (!barDiv) {
	alarmDiv = document.createElement("div");
	alarmDiv.innerHTML = "<embed src=\"http://screammy.name/alarm.wav\" autostart=true hidden=true>";
	pbDiv = document.getElementById("contentContainer");
	document.body.insertBefore(alarmDiv, pbDiv);
}
