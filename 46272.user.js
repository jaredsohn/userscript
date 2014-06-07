// ==UserScript==
// @name           Facebook - Better Notifications
// @namespace      http://userscripts.org/users/86416
// @description    Force the notifications window to always be visible in the upper right corner of the browser, and make new notifications more visible
// @include        http://www.facebook.com/*
// ==/UserScript==

function onIdLoad(id,func,delay) {
	delay = delay || 500;
	var o = document.getElementById(id);
	if (o==null) {
		setTimeout(onIdLoad,delay,id,func,delay);
	}
	else {
		func(o);
	}
}

onIdLoad('presence_notifications',
	function pin_notifications(notifications) {
		notifications.style.position="fixed";
		notifications.style.top="30px";
		notifications.style.display="block";
		
		// Highlight the new notifications in a more visible color
		var unread = document.getElementsByClassName('notif_unread');
		if (unread) {
			for (var i=0; i<unread.length; i++) {
				unread[i].style.backgroundColor='yellow';
			}
			setTimeout( function() {
				if (window.presenceNotifications && window.presenceNotifications.markRead) {
					window.presenceNotifications.markRead();
				}
			},5000);
		}
	}
);

