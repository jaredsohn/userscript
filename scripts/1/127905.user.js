// ==UserScript==
// @name Facebook Poke Notification Dismisser
// @namespace http://davidtsai.net78.net/
// @description Automatically mark poke notifications as read 
// @include http://www.facebook.com/*
// @include https://www.facebook.com/*
// @version 2.2.0
// @run-at document-end
// ==/UserScript==

console.log("Poke Notification Dismisser");
function fb_pnd(){
	if(typeof(Arbiter) == "undefined"){
		window.setTimeout(fb_pnd,100);
	}else{
		function d(id){
			Notifications.prototype._sendIDs([id],'/ajax/notifications/mark_read.php',{seen:0});
			Arbiter.inform("presence/message:notifications_read",{
				obj:{
					alert_ids:[id],
					type:"notifications_read"
				}
			});
		}
		Arbiter.subscribe("channel/message:m_notification",function(a,b){
			console.log("Clearing Poke Notification");
			if(b && b.obj && b.obj.data && (b.obj.data.type == "poke")){
				d(b.obj.data.alert_id);
			}
		});
		//Dismiss notifications that are already there at load time 
		window.setTimeout(function(){
			var notifs = document.getElementById("fbNotificationsList").getElementsByClassName("notification"), i, gt;
			for(i = 0; i < notifs.length; i++){
				gt = JSON.parse(notifs[i].getAttribute("data-gt"));
				if(gt.notif_type == "poke"){
					console.log("Found poke notification with id " + gt.alert_id);
					d(gt.alert_id);
				}
			}
		},2000);
	}
}
var s = document.createElement("script");
s.textContent = String(fb_pnd) + "\nfb_pnd();";
document.head.appendChild(s);
document.head.removeChild(s);