// ==UserScript==
// @name           Facebook - MouseHunt/MythMonger/Ghost Trappers Captcha Detector
// @namespace      MouseHunt/MythMonger/Ghost Trappers
// @description    Detects and alert user when captcha is present on these three Facebook Aplications. 
// @include        *apps.facebook.com/mousehunt*
// @include        *apps.facebook.com/mythmonger*
// @include        *apps.facebook.com/ghost-trappers/captcha.php*
// @include        *apps.facebook.com/ghost-trappers/captcha.php?firsttry=1*
// @include        *http://apps.facebook.com/ghost-trappers/captcha.php?firsttry=1#hunt*
// ==/UserScript==
// Copyright Capeguy 2009
 
function soundAlarm(){
	var alarmDiv = document.createElement("div");
	alarmDiv.innerHTML = "<embed src=\"http://simplythebest.net/sounds/WAV/sound_effects_WAV/sound_effect_WAV_files/attention.wav\" autostart=true hidden=true>";
	document.getElementById("content").appendChild(alarmDiv);
}

if (document.title == "MouseHunt on Facebook | Claim a King's Reward!") {
soundAlarm();
soundAlarm();
	alert("Attention Needed At Mousehunt!");

}
if (document.title == "MythMonger on Facebook | Puzzle") {
soundAlarm();
soundAlarm();
	alert("Attention Needed At MythMonger!");

}
if (document.URL== "http://apps.facebook.com/ghost-trappers/captcha.php?firsttry=1") {
soundAlarm();
soundAlarm();
	alert("Attention Needed At Ghost Trappers!");
if (document.URL== "http://apps.facebook.com/ghost-trappers/captcha.php?firsttry=1#hunt") {
soundAlarm();
soundAlarm();
	alert("Attention Needed At Ghost Trappers!");

}
if (document.URL== "http://apps.facebook.com/ghost-trappers/captcha.php") {
	window.location = "http://apps.facebook.com/ghost-trappers/index.php#hunt";
}
