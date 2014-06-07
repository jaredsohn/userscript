// ==UserScript==
// @name        Facebook Chat Notifications for Fluid
// @namespace   http://www.matthewkrivanek.com
// @description Facebook chat notifications by Growl for Fluid.app
// @include     http://www.facebook.com/presence/popout.php
// @author      Matthew Krivanek
// @version     0.1
// ==/UserScript==
// v0.1 : 2008.10.1 : Initial release

(function () {
	
    if (window.fluid) {
		
		var userID = presence.user;
		
		var currentTabMsgTotal = new Array();
		var currentTabTranscripts = new Array();
				
		function run() {
					
			for (var i in chatDisplay.tabs) {
	
				currentTabTranscripts[i] = chatDisplay.histories[i];
				
				if(!currentTabMsgTotal[i]) currentTabMsgTotal[i] = 0;
				
				if (currentTabMsgTotal[i] < currentTabTranscripts[i].length) { 
					
					var latestEntry = currentTabTranscripts[i][currentTabTranscripts[i].length-1];
					if (latestEntry.type=="msg"){
						if (latestEntry.from != userID) {
							message = latestEntry.msg.text;
						} else { 
							return;
						}
					} else {
						return;
					}
					
					var senderName = chatDisplay.userInfos[i].name;
					var icon = chatDisplay.userInfos[i].thumbSrc;

					currentTabMsgTotal[i] = currentTabTranscripts[i].length;
					
					fluid.showGrowlNotification({
						title: senderName,
						description: message,
						sticky: false,
						//should switch to tab with new message, but for some reason it is switching before click
						//onclick: growlCallback(i),
						identifier: i,
						icon: icon
					});				
					
				}				
			}
		}
		
		function growlCallback(i) {
			window.fluid.activate();
			chatDisplay.tabs[i].tabHitAreaOnClick();
		}
		
		setInterval(run, 3000);

    }
})();