// ==UserScript==
// @name        Growl+
// @namespace   http://fluidapp.com
// @description Displays Google+'s notification count in Growl alert.
// @include     *
// @author      Brian Medrano
// ==/UserScript==

setInterval(newNotif, 1000);

var oldNotifCount = 0;

function newNotif() {
	
	var NotifCount = document.getElementById("gbi1");
	
	if (NotifCount.innerHTML == 0){
		oldNotifCount = 0;
	}
	
	if (NotifCount.innerHTML > oldNotifCount){
	
		oldNotifCount = NotifCount.innerHTML;
		
		fluid.showGrowlNotification({
						title: "G+",
						description: "You have "+ NotifCount.innerHTML + " new Notifications",
						priority: 0,
						sticky: false
		})
	}

}