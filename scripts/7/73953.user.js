// ==UserScript==
// @name		GMail Chat Notification for Chrome
// @namespace		http://gmail.com
// @description		GMail Chat notification for Chrome
// @include		http://mail.google.com/*
// @include		https://mail.google.com/*
// @version         0.0.3
// @author		Raktai Choomeechai
// ==/UserScript==


//refresh is set only once, in the top frame
if(window.webkitNotifications && document.location == top.location){
(function() {
	var gm=document.getElementById("canvas_frame").contentDocument;
	document.addEventListener('DOMSubtreeModified',checkNewChat,false);
	function checkNewChat(){
		var dd = document.getElementsByClassName("Hz"); //highlight chat box
										
		for (di = 0; di < dd.length; di++) {	
			if((dd[di].Notified != undefined && dd[di].Notified) || dd[di].innerText.trim() == "...")continue;				
			
			dd[di].Notified = true;
							
			if (window.webkitNotifications.checkPermission() == 0) { // 0 is PERMISSION_ALLOWED
				name = dd[di].innerText.trim();
				var em = dd[di];
				var notification = window.webkitNotifications.createNotification('', 'Chat Notify', name + ' sent you a chat.');
				notification.onclose = function() { 																							
					var evt = document.createEvent("MouseEvents");			
					em.Notified = false;					
					evt.initMouseEvent("mouseup", true, true, window, 0, 0, 100, 100, 0, false, false, false, false, 0, null);
					em.dispatchEvent(evt);
				};
				
				notification.show();				
			} else {
				//need a user gesture to enable notification
				btn = gm.getElementById('btnEnableNotification');
				if(!btn){
					btn = gm.createElement('input');
					btn.setAttribute('id','btnEnableNotification');
					btn.setAttribute('type','button');
					btn.setAttribute('value','Enable Notification');
					btn.setAttribute('onclick',"window.webkitNotifications.requestPermission();this.parentNode.removeChild(this);");
					gm.getElementById('gbar').appendChild(btn);							
				}					
			}		
		}		
	}
})();
} // end if