// ==UserScript==
// @name        Wave Growl
// @namespace   http://fluid.com
// @description Wave Growl Notification for Fluid
// @include     https://wave.google.com/*

// ==/UserScript==

(function () {
    
	if (!window.fluid) {
		return;
	}

	var unreadMsgCount = 0;

	function growlNewMessages() {

		var oldCount = unreadMsgCount;
	
	
		var title = document.title;
		
        if (title && title.length) {
            var start = title.indexOf("(");
            var end = title.indexOf(")");
            if (start > -1 && end > -1) {
                start++;
                unreadMsgCount = title.substring(start, end);
            } else {
                unreadMsgCount = 0;
            }
        }
	
		// If the unread message count is greater than it was the last
		// time we checked, we know that we've received one or more new
		// messages.
		//alert(unreadMsgCount + ':' + oldCount)
		if (unreadMsgCount > oldCount) {
			
			fluid.showGrowlNotification({
				title: "Wave",
				description: unreadMsgCount + " unread message(s)",
				priority: 0,
				sticky: false
			});
		}
		if(unreadMsgCount != oldCount)
		{
			window.fluid.dockBadge = (unreadMsgCount == 0) ? '' : unreadMsgCount;
		}
	}
	
	// Check for new messages every 10 seconds
	window.setInterval(function(){growlNewMessages();}, 10 * 1000);
	
})();