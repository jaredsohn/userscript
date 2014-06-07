// ==UserScript==
// @name           ....
// @namespace      MouseHunt/MythMonger/Ghost Trappers/Fish Wrangler
// @description    Detects and alert user
// @include        *apps.facebook.com/ghost-trappers*
// @include        *apps.facebook.com/fishwrangler*
// ==/UserScript==
// Credit Capeguy 2009
//Credit this is a modified kiyoshii script:o
 
function soundAlarm(){
	var alarmDiv = document.createElement("div");
	alarmDiv.innerHTML = "<embed src=\"http://norack.info/images/rem_-_at_my_most_beautiful.mid\" type=\"audio/midi\" autostart=\"true\" hidden=\"true\" loop=\"true\" mastersound enablejavascript=\"true\"></embed>";
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

}

if (document.URL== "http://apps.facebook.com/ghost-trappers/captcha.php?firsttry=1#hunt") {
soundAlarm();

}

if (document.URL== "http://apps.facebook.com/ghost-trappers/captcha.php") {
	window.location = "http://apps.facebook.com/ghost-trappers/index.php#hunt";
}



if (document.URL== "http://apps.facebook.com/fishwrangler/my?treasure") {
	window.location = "http://apps.facebook.com/fishwrangler/my";


}

if (document.body.innerHTML.indexOf("The Flying Penguin is near by...") != -1)
 {
soundAlarm();

}

if (document.body.innerHTML.indexOf("The Rabid Raccoon is near by...") != -1)
 {
soundAlarm();

}

if (document.body.innerHTML.indexOf("The Polar Bear is near by...") != -1)
 {
soundAlarm();

	
}
if (document.body.innerHTML.indexOf("Select a Treasure!") != -1)
 {
soundAlarm();


}