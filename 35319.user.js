// ==UserScript==
// @name        Facebook Dock Badges - Inbox & Notifications
// @namespace   http://fluidapp.com
// @description Display a dock badge for Facebook inbox and notifications when using Fluid.
// @include     *.facebook.com/*
// @author      Kahil Young
// ==/UserScript==



var thisNot = '';											
var thisInb = '';	
var thisReq = '';										
var thisTotal = '';							

var spans = document.getElementsByTagName('div');	

(function () {
    updateBadge();
    window.setInterval(updateBadge, 50);
})();

function updateBadge() {
    for (i=0; i<spans.length; i++) {								
		
		if (spans[i].id == 'notificationsWrapper') { 					
			thisNot = spans[i].innerHTML;							
			thisNot = thisNot.replace(/\<[^\>]*\>/g, ''); 					
			if (thisNot=='') {								
				thisNot = 0;								
			} else {									
				thisNot = parseInt(thisNot);					
			}	
		}
		
		if (spans[i].id == 'mailWrapper') {					
			thisInb = spans[i].innerHTML;							
			thisInb = thisInb.replace(/\<[^\>]*\>/g, ''); 									
			if (thisInb=='') {								
				thisInb = 0;								
			} else {									
				thisInb = parseInt(thisInb);						
			}
		}

		if (spans[i].id == 'requestsWrapper') {					
			thisInb = spans[i].innerHTML;							
			thisInb = thisInb.replace(/\<[^\>]*\>/g, ''); 									
			if (thisInb=='') {								
				thisInb = 0;								
			} else {									
				thisInb = parseInt(thisInb);						
			}
		}
		
	}
	
	thisTotal = thisNot + thisInb + thisReq;									
	if (thisTotal==0) {										
		thisTotal = '';
	} else {											
		window.fluid.dockBadge = thisTotal;
	}
	
}							