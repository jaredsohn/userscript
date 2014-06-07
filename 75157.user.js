// ==UserScript==
// @name           kiyos page din load detector
// @namespace      MouseHunt/Ghost Trappers
// @description    Detects and alert user
// @include        *apps.facebook.com/mousehunt*
// @include        *apps.facebook.com/ghost-trappers*
// ==/UserScript==
 
function soundAlarm(){
	var alarmDiv = document.createElement("div");
	alarmDiv.innerHTML = "<embed src=\"http://h1.ripway.com/kiyoshii/taylorswiftlovestory.wma\" autostart=true hidden=true>";
	document.getElementById("content").appendChild(alarmDiv);
}

if (document.body.innerHTML.indexOf("The connection was reset") != -1)
 {
soundAlarm();
	alert("Page cannot load!");

}

if (document.body.innerHTML.indexOf("Ghost Trappers Smart Autohunt detected a captcha. Stopping refresh.") != -1)
 {
soundAlarm();
	alert("Cannot Load");

}

