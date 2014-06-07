// ==UserScript==
// @name           Facebook - Better Notifications
// @namespace      http://userscripts.org/users/107131
// @description    Force the notifications window to always be visible in the upper right corner of the browser, and make new notifications more visible
// @include        http://www.facebook.com/*
// ==/UserScript==

function pin_notifications() {
	var notifications = document.getElementById('presence_notifications');
	if (notifications) {
		notifications.style.position="fixed";
		notifications.style.top="30px";
		notifications.style.display="block";
	}
	
	// Highlight the new notifications in a more visible color
	var unread = document.getElementsByClassName('notif_unread');
	if (unread) {
		for (var i=0; i<unread.length; i++) {
			unread[i].style.backgroundColor='blue';
		}
		if (unsafeWindow.presenceNotifications) {
			setTimeout( function() { unsafeWindow.presenceNotifications.markRead(); }, 5000 );
		}
	}
}

pin_notifications();