// ==UserScript==
// @name			Facebook Growl Notifications - Messages & Notifications
// @namespace		http://fluidapp.com
// @description	Displays growl notifications for Facebook messages and notifications when using Fluid.
// @include		*.facebook.com/*
// @author		Marko Kaestner
// ==/UserScript==

function updateGrowl() {
	var notify = document.getElementsByClassName('hasCount');

	for (i=0; i<notify.length; i++) {
		if (notify[i].id == 'notifications_jewel') {
			var count = notify[i].getElementsByClassName('count')[0].innerHTML;
			if (count > 0) {
				fluid.showGrowlNotification({
					title: "Facebook",
					description: "You have " + count + " unread " + ((count > 1) ? "notifications" : "notification") + ".",
					priority: 0,
					sticky: false
				});
			}
		}

		if (notify[i].id == 'messages_jewel') {
			var count = notify[i].getElementsByClassName('count')[0].innerHTML;
			if (count > 0) {
				fluid.showGrowlNotification({
					title: "Facebook",
					description: "You have " + count + " unread " + ((count > 1) ? "messages" : "message") + ".",
					priority: 0,
					sticky: false
				});
			}
		}
	}
}

setTimeout(updateGrowl, 5000);