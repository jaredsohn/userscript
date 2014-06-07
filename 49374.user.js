// ==UserScript==
// @name          Gmail Prism Notifications
// @namespace     http://persistent.info/greasemonkey
// @description	  Adds Gmail Notifications to prism
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

if (window.platform){
	function findNewMail(){
		inboxDiv = document.getElementById("canvas_frame").contentDocument.getElementById(":r2");

		if (inboxDiv) {
			inboxLinkTitle = inboxDiv.getElementsByTagName('a')[0].title;
			matches = inboxLinkTitle.match(/\((\d*)\)/);

			if (matches) {
				if (matches[1] > oldCount) {
					oldCount = matches[1];
					window.platform.showNotification(
						"New GMail", matches[1]+" unread messages", "http://mail.google.com/mail/images/favicon.ico");
				}
			}
		}
	}
	window.setInterval(function(){findNewMail();}, 10 * 1000);
}