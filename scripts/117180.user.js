// ==UserScript==
// @name        Stack Exchange Growl+Badge (Fluid SSB)
// @namespace   http://userscripts.org/scripts/show/117180
// @description Stack Exchange Inbox Growl Notification with Dock Badge for Fluid
// @include     http://*stackoverflow.com/*
// @include     http://*serverfault.com/*
// @include     http://*superuser.com/*
// @include     http://*stackapps.com/*
// @include     http://*stackexchange.com/*
// @include     http://*answers.onstartups.com/*
// @include     http://*mathoverflow.net/*
// @author      Martin Kopischke
// @attribution Tom Hensel (http://userscripts.org/scripts/show/72181)
// @copyright   2011+, Martin Kopischke (http://martin.kopischke.net/)
// @license     (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version     0.1
// ==/UserScript==

(function () {
    
	if (!window.fluid) {
		alert("This script is meant to be run in Fluid! You should disable it.");
		return;
	}

	// Global vars
	var unreadMsgCount = 0;
	var firstCheck;
	var intervalCheck;

	// Script options
	var initialDelay = 5;		// seconds to wait for the first check
	var pollInterval = 7.5;		// seconds to wait between checks
	var growlPriority = 1;		// Growl preference
	var growlSticky = false;	// Growl preference


	function growlNewMessages() {
		var oldCount = unreadMsgCount;
	
		// Locate the MultiCollider
		var multiCollider = document.getElementById("portalLink");
		if( multiCollider ) {
			var inboxBubble = multiCollider.getElementsByClassName("unreadCount").item(0);
			if (inboxBubble) {
				unreadMsgCount = inboxBubble.textContent;
			}
		}

		// If the unread message count is greater than it was the last
		// time we checked, we know that we've received one or more new
		// messages.
		if (unreadMsgCount > oldCount) {
			// correct singular / plural for message
			if (unreadMsgCount > 1) {
				var growlMessage = unreadMsgCount + " unread message in your inbox.";
			} else {
				var growlMessage = unreadMsgCount + " unread messages in your inbox.";	
			}
			// Show Growl notification
			window.fluid.showGrowlNotification({
				title: "Stack Exchange",
				description: growlMessage,
				priority: growlPriority,
				sticky: growlSticky
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
	firstCheck = window.setTimeout(function(){growlNewMessages();}, initialDelay * 1000);
	// Check for new messages every [pollInterval] seconds
	intervalCheck = window.setInterval(function(){growlNewMessages();}, pollInterval * 1000);
	
})();