// ==UserScript==
// @name           kiyos all in one detector
// @namespace      MouseHunt/MythMonger/Ghost Trappers/Fish Wrangler
// @description    Detects and alert user
// @include        *apps.facebook.com/mousehunt*
// @include        *apps.facebook.com/mythmonger*
// @include        *apps.facebook.com/fishwrangler*
// @include        *apps.facebook.com/ghost-trappers*
// ==/UserScript==
// Credit Capeguy 2009
 
function soundAlarm(){
	var alarmDiv = document.createElement("div");
	alarmDiv.innerHTML = "<embed src=\"http://h1.ripway.com/kiyoshii/taylorswiftlovestory.wma\" autostart=true hidden=true>";
	document.getElementById("content").appendChild(alarmDiv);
}

if (document.title == "MouseHunt on Facebook | Claim a King's Reward!") {
soundAlarm();
	alert("Mousehunt Reward!");

}
if (document.title == "MythMonger on Facebook | Puzzle") {
soundAlarm();
	alert("MythMonger Puzzle!");

}

if (document.URL== "http://apps.facebook.com/ghost-trappers/captcha.php?firsttry=1") {
soundAlarm();
	alert("Ghost Trappers code!");

}

if (document.URL== "http://apps.facebook.com/ghost-trappers/captcha.php?firsttry=1#hunt") {
soundAlarm();
	alert("Ghost Trappers code!");

}

if (document.URL== "http://apps.facebook.com/ghost-trappers/captcha.php") {
	window.location = "http://apps.facebook.com/ghost-trappers/index.php#hunt";
}



if (document.URL== "http://apps.facebook.com/fishwrangler/my?treasure") {
	window.location = "http://apps.facebook.com/fishwrangler/my";
}


if (document.URL== "http://apps.facebook.com/fishwrangler/auger") {
soundAlarm();
	window.location = "http://apps.facebook.com/fishwrangler/start";
}

if (document.body.innerHTML.indexOf("Get Chum") != -1)
 {
soundAlarm();
	alert("No chum to fish!");

}

if (document.body.innerHTML.indexOf("None!") != -1)
 {
soundAlarm();
	alert("No cheese At Mousehunt!");

}

if (document.body.innerHTML.indexOf("The Flying Penguin is near by...") != -1)
 {
soundAlarm();
	alert("Guinny alert!");

}

if (document.body.innerHTML.indexOf("The Rabid Raccoon is near by...") != -1)
 {
soundAlarm();
	alert("Racoon alert!");

}

if (document.body.innerHTML.indexOf("The Polar Bear is near by...") != -1)
 {
soundAlarm();
	alert("Polar Bear alert!");

}

if (document.body.innerHTML.indexOf("Select a Treasure!") != -1)
 {
soundAlarm();
 alert("Good Luck in choosing treasure!"); 

}