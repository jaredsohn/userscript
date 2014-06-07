// ==UserScript==
// @name        Grooveshark Chat Timestamper
// @namespace   Grooveshark
// @description Add timestamps to the Grooveshark Broadcast Chat
// @include     http://grooveshark.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.0.1
// @grant       none
// ==/UserScript==

window.addEventListener('load', function() {
	Notification.requestPermission(function (status) {
		console.log(status)
		if (Notification.permission !== status) {
			Notification.permission = status
		}
	})
})

function chatNotification(user, message) {
	if (!("Notification" in window)) {
		console.log("No desktop notification support");
	}

	else if (Notification.permission === "granted") {
		var notification = new Notification(user, {body: message});
	}

	else if (Notification.permission === 'default') {
		Notification.requestPermission(function (permission) {
			if(!('permission' in Notification)) {
				Notification.permission = permission;
			}

			if (permission === 'granted') {
				var notification = new Notification(user, {body: message});
			}
		});
	}
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(".GstayTimeStamper {font-size:8pt; font-family:Arial; color:#999; padding-left:5px;float:left;line-height:13px;}");
addGlobalStyle(".user-name {font-size:8pt; font-family:Arial;}")

function addZero(i) {
	if (i<10) {
		i="0" + i;
	}
return i;
}

function getFormattedTime() {
	dt = new Date();
	h = addZero(dt.getHours());
	m = addZero(dt.getMinutes());
	return (h + ":" + m);
}

$(document).bind('DOMNodeInserted', function(e) {
	if ($(e.target).hasClass("chat-message")){
		($(e.target).find(".user-name")).after(
			"<span class='GstayTimeStamper'>" + getFormattedTime() + "</span>"
			);
    	//console.log(($(e.target).find(".message")).text());

    	// Check to see if anyone mentions the users display name
    	// Might want to add ability to check against a list of possible hilights chosen by the user
    	//if ((($(e.target).find(".message")).text()).indexOf(($('#profile-button .title').text())) != -1) {
    	//	chatNotification(($(e.target).find("user-name").text()), (($(e.target).find(".message")).text()))
    	//}
	}
});