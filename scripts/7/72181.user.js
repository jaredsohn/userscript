// ==UserScript==
// @name        Gmail Growl+Sound+Badge (Fluid/Fluidium SSB)
// @namespace   http://userscripts.org/scripts/show/57672
// @description Gmail Growl Notification with Sound Alert and Dock Badge for Fluid
// @include     http://mail.google.com/*
// @include     http://*.google.com/mail/*
// @include     https://mail.google.com/*
// @include     https://*.google.com/mail/*
// @author      Tom Hensel
// @attribution shellshock (http://userscripts.org/scripts/review/57672), Nicky Leach (http://userscripts.org/scripts/show/56774)
// @copyright   2010+, Tom Hensel (http://tom.interpol8.net/)
// @license     (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version     0.0.4
// @require     http://usocheckup.redirectme.net/72181.js
// ==/UserScript==

(function () {
    
	if (!window.fluid) {
		alert("This script is meant to be run in Fluid! You should disable it.");
		return;
	}

	// Global vars
	var unreadMsgCount = 0;
	var firstcheck;
	var intervalcheck;

	// Script options
	var initialDelay = 5;		// seconds to wait for the first check
	var pollInterval = 7.5;		// seconds to wait between checks
	var priority = 1;		// Growl preference
	var sticky = false;		// Growl preference


	function growlNewMessages() {
		var oldCount = unreadMsgCount;
	
		// Locate the DIV containing the Inbox hyperlink
		var frame = document.getElementById("canvas_frame");
		if( frame ) {
			var inboxElement = frame.contentDocument.getElementsByClassName("n0").item(0);
	
			if (inboxElement) {
				
				// Grab the title of the Inbox hyperlink and locate the
				// unread message count
				var inboxLinkTitle = inboxElement.title;
				matches = inboxLinkTitle.match(/\((\d*)\)/);
			
				if (matches) {
					unreadMsgCount = matches[1];
				} else {
					unreadMsgCount = 0;
				}
			}
		}

		// If the unread message count is greater than it was the last
		// time we checked, we know that we've received one or more new
		// messages.
		if (unreadMsgCount > oldCount) {
			// Play default system alert sound (see OSX "Sound" Preferences Pane)
			window.fluid.beep();
			// Show Growl notification
			window.fluid.showGrowlNotification({
				title: "Gmail",
				description: unreadMsgCount + " unread message(s)",
				priority: priority,
				sticky: sticky
			});
			// Show Badge notification
			window.fluid.dockBadge = unreadMsgCount;
		}
		
		// If you've read some messages since the last check: Show new Badge
		else if (unreadMsgCount < oldCount) {
			// There are still some unread messages: Show new number
			if (unreadMsgCount > 0) {
				window.fluid.dockBadge = unreadMsgCount;
			}
			// All messages are read since the last check: Clear Badge
			else {
				window.fluid.dockBadge = "";
			}
		}
	}
	
	//Run the 1st check after [initialDelay] seconds
	firstcheck = window.setTimeout(function(){growlNewMessages();}, initialDelay * 1000);
	// Check for new messages every [pollInterval] seconds
	intervalcheck = window.setInterval(function(){growlNewMessages();}, pollInterval * 1000);
	
})();