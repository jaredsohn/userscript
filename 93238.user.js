// ==UserScript==
// @name		GMail Chat Notification for Chrome
// @namespace		http://gmail.com
// @description		GMail Chat notification for Chrome
// @include		http://mail.google.com/*
// @include		https://mail.google.com/*
// @version         1.0.1
// @author		Mark Piro (refactored and extended from Raktai Choomeechai's script)
// ==/UserScript==


if (top != self) {
 top.onbeforeunload = function() {};
 top.location.replace(self.location.href);
}

if (window.webkitNotifications) {
	
	if (window.webkitNotifications.checkPermission() != 0) {  //need a user gesture to enable notification
		var gm=document.getElementById("canvas_frame").contentDocument;
		btn = gm.createElement('input');
		btn.setAttribute('id','btnEnableNotification');
		btn.setAttribute('type','button');
		btn.setAttribute('value','Enable Notification');
		btn.setAttribute('onclick',"window.webkitNotifications.requestPermission();this.parentNode.removeChild(this);");
		gm.getElementById('gbar').appendChild(btn);	
	}
	
	document.addEventListener('DOMSubtreeModified',checkNewChat,false);
	
	y = 1
	
function note() {
	if ((hz[0].Notified != undefined && hz[0].Notified) || hz[0].innerText.trim() == "...") {
		var msg = hz[0].nextSibling.childNodes[4].firstChild.firstChild.firstChild.lastChild.lastChild.innerText.trim();				
		var name = hz[0].innerText.trim();
		em = hz[0];
				
		n = window.webkitNotifications.createNotification('http://mail.google.com/mail/contacts/u/0/static/images/NoPicture.gif', name + ' says...', msg.replace(/^([a-zA-Z0-9_. -]*:)/gi, ''));
		n.ondisplay = function() {
			y = 0;
			var evt = document.createEvent("MouseEvents");			
			em.Notified = false;					
			evt.initMouseEvent("mousedown", true, true, window, 0, 0, 100, 100, 0, false, false, false, false, 0, null);
			em.dispatchEvent(evt);
		}
			
		n.onclick = function () {
			window.focus();
			n.cancel();
		}
			
		window.onfocus = function() {
			n.cancel();
		}
			
		n.replaceId = 'a'
		n.show();
	}
}

function checkNewChat() {
	hz = document.getElementsByClassName("Hz");
	w = window.webkitNotifications.checkPermission() == 0					
	
	hz[0].Notified = true;
	
	if (y == 1 && w) {
		note();
	}
            		
	else if (y == 0 && w) {
		y = 1;
        n.cancel();
		note();
	}
}
}