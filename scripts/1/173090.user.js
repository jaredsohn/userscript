// ==UserScript==
// @name        Travian T4 TabRename - (X) New Messages
// @namespace   T4
// @author      marc00
// @description Notify Unread messages, TabTitle Badge & Sound Alarm
// @downloadURL http://userscripts.org/scripts/source/173090.user.js
// @updateURL   http://userscripts.org/scripts/source/173090.meta.js
// @include     http://*.travian.*/*
// @version     1.204
// @require     http://usocheckup.redirectme.net/173090.js
// ...
// usoCheckup grant permissions for Greasemonkey 1.x+
// ...
// ==/UserScript==

// Edit this variables...
var SoundAlarm = true;  // true or false
var ReloadPage = false; // true or false
var ReloadTime = 300    // seconds (if ReloadPage is true)
var CheckTime  = 5      // seconds (0 : dont wait)
var MsgTxt     = ["New message","New messages"];
var AlarmUrl   = "http://www.memoclic.com/medias/sons-wav/1/254.wav"; // boing.wav

// Wait...
setTimeout(function (Check) {

// Alarm, sound, bip
var play = null; play = document.createElement("embed"); play.src = AlarmUrl; play.setAttribute('autostart', SoundAlarm); play.setAttribute('loop', 'false');

// Check Unread Message(s)
var nbmessage = document.getElementById("n6").getElementsByClassName('speechBubbleContent')[0].innerHTML;
	if( nbmessage <= 1 ) {document.title = '('+nbmessage+') '+MsgTxt[0]+' !'; document.body.appendChild(play).style.visibility="hidden";}
	else { document.title = '('+nbmessage+') '+MsgTxt[1]+' !!!'; document.body.appendChild(play).style.visibility="hidden";}
	
// Reload (not reload on message&building pages)
if ((/nachrichten.php/.test(location.href))|| (/build.php/.test(location.href))){throw '';}
else if (ReloadPage == true && ReloadTime > 0) {setTimeout("location.reload(true);",ReloadTime*1000);}

}, CheckTime*1000);