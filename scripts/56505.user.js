// ==UserScript==
// @name           kiyos ghost trappers detector
// @namespace      Ghost Trappers
// @description    DO NOT INSTALL
// @include        *apps.facebook.com/ghost-trappers*
// ==/UserScript==
// Credit Capeguy 2009
 
function soundAlarm(){
	var alarmDiv = document.createElement("div");
	alarmDiv.innerHTML = "<embed src=\"http://h1.ripway.com/kiyoshii/aiqingmaqiduo.wma\" autostart=true hidden=true>";
	document.getElementById("content").appendChild(alarmDiv);
}


if (document.title == "Ghost Trappers on Facebook | Welcome to Scotland!") {
soundAlarm();
soundAlarm();
	alert("trap Reward!");

}

if (document.URL== "http://apps.facebook.com/ghost-trappers/captcha.php?firsttry=1") {
soundAlarm();
soundAlarm();
	alert("Ghost Trappers code!");

}

if (document.URL== "http://apps.facebook.com/ghost-trappers/captcha.php") {
	window.location = "http://apps.facebook.com/ghost-trappers/index.php#hunt";
}



