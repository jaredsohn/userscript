// ==UserScript==
// @name Freenode Webchat Chrome Notifications
// @description Adds google chrome notifications to the freenode webchat
// @match http://webchat.freenode.net/*
// @copyright 2011 Benjamin Lupton
// @license MIT License http://opensource.org/licenses/mit-license.php
// ==/UserScript==

// Notify
var webkitNotifications = window.webkitNotifications,
	chatEl, lastCheck,
	showNotification = function(){
		if ( !webkitNotifications.checkPermission() ) {
			// Extract
			var	title,text,timer,notification,
				messageEl = chatEl.childNodes[chatEl.childNodes.length-1],
				message = messageEl.textContent,
				picture = 'http://linux.ucla.edu/lugwiki/lib/tpl/lugtheme/images/icon_irc.png',
				matches = message.match(/\<([a-zA-Z0-9-_]+)\>(.+)/);
			
			// Dtermine
			if ( matches.length === 3 ) {
				title = matches[1]+':';
				text = matches[2];
			}
			else {
				title = 'New message';
				text = '';
			}

			// Notification
			notification = webkitNotifications.createNotification(picture, title, text),
			notification.ondisplay = function(){
				timer = setTimeout(function(){
					notification.cancel();
				},5000);
			};
			notification.onclose = function(){
				if ( timer ) {
					clearTimeout(timer);
					timer = null;
				}
			};
			notification.show();
		}
	};

// Enable
if ( webkitNotifications.checkPermission() ) {
	document.body.onclick = function(){
		webkitNotifications.requestPermission();
		delete document.body.onclick;
	}
}

// Check
setInterval(function(){
	chatEl = document.getElementsByClassName('ircwindow')[0];
	if ( chatEl ) {
		var newCheck = chatEl.childNodes.length;
		if ( lastCheck !== newCheck ) {
			lastCheck = newCheck;
			showNotification();
		}
	}
},1000);
