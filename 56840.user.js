// ==UserScript==
// @name        Facebook Growl Notifications - Inbox & Notifications
// @namespace   http://fluidapp.com
// @description Display a growl notification for Facebook inbox and notifications when using Fluid.
// @include     *.facebook.com/*
// @author      Kahil Young
// ==/UserScript==



var notify = '';											
var inbox = '';											
var spans = document.getElementsByTagName('span');	


(function () {
    updateGrowl();
    window.setInterval(updateGrowl, 45000);
})();

function updateGrowl() {
    for (i=0; i<spans.length; i++) {								
		
		if (spans[i].id == 'presence_notifications_count') { 					
			notify = spans[i].innerHTML;							
			notify = notify.replace(/\<[^\>]*\>/g, ''); 					
			notify = notify.replace(/\[[^\]]*\]/g, ''); 					
			notify = notify.replace(/\strong/, '');

                        if (notify=='') {								
				notify = 0;

                        } else if (notify==1) {

                        fluid.showGrowlNotification({
                                       title: "Facebook",
                                       description: "You have " + notify + " new notification.",
                                       priority: 0,
                                       sticky: false
                                })
								
			} else {
  					
			fluid.showGrowlNotification({
                                       title: "Facebook",
                                       description: "You have " + notify + " new notifications.",
                                       priority: 0,
                                       sticky: false
                                });							}
				
		}
		
		if (spans[i].id == 'fb_menu_inbox_unread_count') {					
			inbox = spans[i].innerHTML;							
			inbox = inbox.replace(/\<[^\>]*\>/g, ''); 					
			inbox = inbox.replace(/\[[^\]]*\]/g, ''); 
  
                        if (inbox=='') {								
				inbox = 0;
         
                        } else if (inbox==1) {								
                        fluid.showGrowlNotification({
                                       title: "Facebook",
                                       description: "You have " + inbox + " new message.",
                                       priority: 0,
                                       sticky: false
                                });

                } else if (inbox > 1) {
 
                        fluid.showGrowlNotification({
                                       title: "Facebook",
                                       description: "You have " + inbox + " new messages.",
                                       priority: 0,
                                       sticky: false
                                });						}
			
		}
		
	}
	
}							
