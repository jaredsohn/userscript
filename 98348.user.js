// ==UserScript==
// @name          Prd Facebook desktop notification (for Google Chrome/Chromium)
// @namespace     prd
// @version 	  1.0.0.21
// @description	  Facebook desktop notification
// @include       http*://www.facebook.com/*
// @include       http*://facebook.com/*
// ==/UserScript==
//

//Known issues:
//	- Multiple facebook page make multiple notification



waitPerm=function (){
	if (webkitNotifications.checkPermission() == 0) {
		location.reload(true);
	}
	setTimeout("waitPerm()", 2000);
};


var frCounter = 0;
var msgCounter = 0;
var notifCounter = 0;

var lastFrCounter = 0;
var lastMsgCounter = 0;
var lastNotifCounter = 0;

if (window.webkitNotifications) {
	if (window.webkitNotifications.checkPermission() == 1) { //PERMISSION_NOT_ALLOWED
		var pageLogo=document.getElementById("pageLogo");
		pageLogo.innerHTML="<a href='#' title='Home' rel='noreferrer' onclick='void(window.webkitNotifications.requestPermission());'  ></a>";
		alert('Please allow notifications by clicking Facebook logo at left top!');
		setTimeout("waitPerm()", 2000);
	}

	var frCounterElement = document.getElementById("requestsCountValue");
	var msgCounterElement = document.getElementById("messagesCountValue");
	var notifCounterElement = document.getElementById("notificationsCountValue");


	frCounter = frCounterElement.innerHTML;
	lastFrCounter=frCounter;
	msgCounter = msgCounterElement.innerHTML;
	lastMsgCounter=msgCounter;
	notifCounter = notifCounterElement.innerHTML;
	lastNotifCounter=notifCounter;



	//var lastCounter = document.title.replace(/.*\((\d+)\)/,"$1");
	//lastCounter = isNaN(parseInt(lastCounter)) ? 0 : parseInt(lastCounter);


	//var windowIsActive=true;

	//var setActive(active)=function () {
	//	windowIsActive=active;
	//}	

	//window.onfocus = setActive(true);
	//window.onblur = setActive(false);


	notify=function (){

		frCounter = frCounterElement.innerHTML;
		msgCounter = msgCounterElement.innerHTML;
		notifCounter = notifCounterElement.innerHTML;
	
		//var currentCounter = document.title.replace(/.*\((\d+)\)/,"$1");
		//currentCounter = isNaN(parseInt(currentCounter)) ? 0 : parseInt(currentCounter);


		//if (false==windowIsActive && lastCounter<currentCounter) {
		//if (lastCounter<currentCounter) {
		if (frCounter>lastFrCounter || msgCounter>lastMsgCounter || notifCounter>lastNotifCounter ) {
			var msg="";
			if (frCounter>lastFrCounter) {
				msg=msg+"| "+(frCounter-lastFrCounter)+" new Friend Request(s) |";
			}

			if (msgCounter>lastMsgCounter) {
				msg=msg+"| "+(msgCounter-lastMsgCounter)+" new Message(s) |";
			}

			if (notifCounter>lastNotifCounter) {
				msg=msg+"| "+(notifCounter-lastNotifCounter)+" new Notification(s) |";
			}

			window.webkitNotifications.createNotification(
					'https://s-static.ak.facebook.com/rsrc.php/yi/r/q9U99v3_saj.ico',
					'Facebook ('+frCounter+'|'+msgCounter+'|'+notifCounter+')', 
					msg
				).show();
			//lastCounter=currentCounter;

			lastFrCounter=frCounter;
			lastMsgCounter=msgCounter;
			lastNotifCounter=notifCounter;
		}
	

		setTimeout("notify()", 30000);
	};

	setTimeout("notify()", 30000);



}
else {
	alert("Notifications are not supported for this browser version yet.");
}
