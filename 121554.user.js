// ==UserScript==
// @name           yippifier
// @namespace      balls
// @version        0.1
// @description    yipayapp reply notification sound
// @include        http://yippayap.com/*
// @resource       GMwavaudio http://gmflowplayer.googlecode.com/files/notify.wav
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var oggB64 = GM_getResourceURL("GMwavaudio");
var ausrc = 'data:audio/wav;base64,' + oggB64.split('data:application/octet-stream;base64,')[1];
var aud = document.createElement('audio');
aud.setAttribute('src', ausrc);
aud.setAttribute('id', 'GMwavaudio');
document.body.appendChild(aud);

var notificationShowing = false;
var notificationPending = true;
var upDate1 = Date.now();

window.setInterval(function(){ 

	if ($("#notificationsButton:visible").length > 0){
		notificationShowing = true;
	}
	else {
		notificationShowing = false;
		notificationPending = true;
	}

	if(notificationShowing && notificationPending && (Date.now() > upDate1)){
		aud.play();
		upDate1 = Date.now();
		notificationPending = false;
	}
		
},2000);	//every thirty seconds seems reasonable