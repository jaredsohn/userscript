// ==UserScript==
// @name           kiyos auto driller
// @namespace      Fish Wrangler
// @description    Detects and alert user
// @include        *apps.facebook.com/fishwrangler*
// ==/UserScript==
// Credit Capeguy 2009
 
function soundAlarm(){
	var alarmDiv = document.createElement("div");
	alarmDiv.innerHTML = "<embed src=\"http://simplythebest.net/sounds/WAV/sound_effects_WAV/sound_effect_WAV_files/attention.wav\" autostart=true hidden=true>";
	document.getElementById("content").appendChild(alarmDiv);
}

if (document.URL== "http://apps.facebook.com/fishwrangler/auger") {
	window.location = "http://apps.facebook.com/fishwrangler/start";
}

