// ==UserScript==
// @name           kiyos MH detector
// @namespace      MouseHunt
// @description    Detects and alert user
// @include        *apps.facebook.com/mousehunt*
// ==/UserScript==
// Credit Capeguy 2009
 
function soundAlarm(){
	var alarmDiv = document.createElement("div");
	alarmDiv.innerHTML = "<embed src=\"http://h1.ripway.com/kiyoshii/taylorswiftlovestory.wma\" autostart=true hidden=true>";
	document.getElementById("content").appendChild(alarmDiv);
}

if (document.title == "| King's Reward!") {
soundAlarm();
	alert("Mousehunt Reward!");

}

if (document.title == "MouseHunt on Facebook | Claim a King's Reward!") {
soundAlarm();
	alert("Mousehunt Reward!");

}

if (document.body.innerHTML.indexOf("Can't read the code?") != -1)
 {
soundAlarm();
	alert("OMG MH CAPTCHA");

}

if (document.body.innerHTML.indexOf("None!") != -1)
 {
soundAlarm();
	alert("OMG MH no cheese!!");

}