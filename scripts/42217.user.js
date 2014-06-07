// ==UserScript==
// @name		GMail Chat Notifications for Fluid
// @namespace		http://gmail.com
// @description		Adds Growl/dock badge support for GMail Chat notifications on Fluid
// @include		http://mail.google.com/*
// @include		https://mail.google.com/*
// @author		Ambarish Chaudhari
// ==/UserScript==


//refresh is set only once, in the top frame
if(document.location == top.location){
(function() {
	//This is the default title
	var chatTitlePattern = new RegExp(".* says.*");
	//Set the current user that is speaking
	var user = null;
    var counter = 0;
    
    function bringToFront() {
        window.fluid.unhide();
        window.fluid.activate();
    }
	
	//This method checks the document title for change
	function checkForChange() {
        //If it's the same as the default, lets clear the dock badge
        if(chatTitlePattern.test(document.title) != true) {
            if(counter > 0) {
                if(counter == 1) {
                    window.fluid.setDockBadge("");
                }
                --counter;
            }
        } else {
            user = document.title.replace(/ says.*/gi, "");
            //alert(user);
            //Lets set the dock badge to the user that is speaking
            window.fluid.setDockBadge(user);
            if(counter == 0) {
                window.fluid.showGrowlNotification({
                    title: "GMail Chat",
                    description: user + " says...",
                    priority: 1,
                    sticky: false,
                    onclick: bringToFront
                });
            }
            counter = 5;
        }
	}
    
	//Periodically check the title for change
	setInterval(function() { 
        checkForChange(); 
    }, 1000);
})();
} // end if