// ==UserScript==
// @name		Meebo Notifications
// @namespace		http://fluidapp.com
// @description		Adds Growl/dock badge support for Meebo IM notifications
// @include		http://www.meebo.com/*
// @author		El Draper
// ==/UserScript==

(function() {
	//This is the default title
	var defaultTitle = "meebo.com";
	//Set the title to currently be the default
	var title = defaultTitle;
	//Set the current user that is speaking
	var user = null;
	
	//This method checks the document title for change
	function checkForChange() {
		//Check to see if the title has changed since we last checked
		if(title != document.title) {
			//If it's the same as the default, lets clear the dock badge
			if(document.title == defaultTitle) {
				window.fluid.setDockBadge("");
			} else {
				//Check to see if it starts with "
				if(document.title.substring(0, 1) == "\"") {
					//Replace ""
					message = new String(document.title).replace("\"", "").replace("\"", "");
					//Add the user to the message if we know who is speaking
					if(user != null) {
						message = user + ": " + message;
					}
					//It's something that someone is saying, so lets show a growl notification
					window.fluid.showGrowlNotification({
						title: "Meebo",
						description: message,
						priority: 1,
						sticky: false,
						identifier: document.title,
						icon: "http://www.meebo.com/favicon.ico"
					});
				} else {
					//Grab the user, replace !
					user = new String(document.title).replace("!", "")
					//Lets set the dock badge to the user that is speaking
					window.fluid.setDockBadge(user);
				}
			}
			//Set the title so that it can be used to check for change next time
			title = document.title;
		}
	}
	
	//Periodically check the title for change
	setInterval(function() { checkForChange(); }, 2000);
})();