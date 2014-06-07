// ==UserScript==
// @name        Gmail Growl
// @namespace   http://dehamer.com
// @description Gmail Growl Notification for Fluid
// @include     http://mail.google.com/*
// @include     http://*.google.com/mail/*
// @include     https://mail.google.com/*
// @include     https://*.google.com/mail/*
// @author      Brian DeHamer (patched by André Heie Vik)
// ==/UserScript==

(function () {
    
	if (!window.fluid) {
		return;
	}

	var unreadMsgCount = 0;

	function growlNewMessages() {

		var oldCount = unreadMsgCount;
	
		// Locate the DIV containing the Inbox hyperlink
		inboxElement = document.getElementById("canvas_frame").contentDocument
		                    .getElementsByClassName("n0").item(0);

		if (inboxElement) {
			
			// Grab the title of the Inbox hyperlink and locate the
			// unread message count
			inboxLinkTitle = inboxElement.title;
			matches = inboxLinkTitle.match(/\((\d*)\)/);
		
			if (matches) {
				unreadMsgCount = matches[1];
			} else {
				unreadMsgCount = 0;
			}
		}
	
		// If the unread message count is greater than it was the last
		// time we checked, we know that we've received one or more new
		// messages.
		if (unreadMsgCount > oldCount) {
			
			fluid.showGrowlNotification({
				title: "Gmail",
				description: unreadMsgCount + " unread message(s)",
				priority: 0,
				sticky: false
			});
		}
	}
	
	// Check for new messages every 10 seconds
	window.setInterval(function(){growlNewMessages();}, 10 * 1000);
	
})();