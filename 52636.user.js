// ==UserScript==
// @name        Fluid Friendfeed
// @namespace   http://fluidapp.com
// @description Add's a dock badge when direct messages are received.
// @include     *
// @author      Richard Bradshaw
// ==/UserScript==

(function () {

    var numMessages = 0;
    
    var refreshTime = 5000;
    
    function setBadge(value) {
        window.fluid.dockBadge = value || '';
    }
    
    function numDMs() {
        var number = 0;
        var temp = $("div.box-body div.section ul li a.unread").html().match(/[0-9]+/g);
        
        if (temp != null) {
            number = temp[0];
        } 
    
        return number;
    }
    
    function growlNotifyMessages(number) {
		if (number == 1) {
			var growlDescription = "You have "+number+" new direct message.";			
		} else {
			var growlDescription = "You have "+number+" new direct messages.";			
		}


        window.fluid.showGrowlNotification({
            title: "New Direct Messages", 
            description: growlDescription, 
            priority: 1, 
            sticky: false,
            identifier: "FFDM",
            //onclick: callbackFunc,
            //icon: imgEl // or URL string
        })
    }
    function update() {
        numNewMessages = numDMs();
        
        if (numNewMessages > numMessages) {
            growlNotifyMessages(numNewMessages - numMessages);
            numMessages = numNewMessages;
        }
        setBadge(numMessages);
    }
    
    if (window.fluid) {
        update();
        
		window.onfocus = function() {
			update();
		};
		
		window.onblur = function() {
			update();
		};
		
		window.fluid.addDockMenuItem("Check for DMs", update)
        setInterval(update, refreshTime);
    }
})();