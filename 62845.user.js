// ==UserScript==
// @name        Facebook Chat Notifications for Fluid
// @namespace   http://www.matthewkrivanek.com
// @description Facebook chat notifications by Growl for Fluid.app
// @include     http://www.facebook.com/presence/popout.php
// @author      Matthew Krivanek / update by cyan
// @version     0.2
// ==/UserScript==
// v0.1 : 2008.10.1 : Initial release
// v0.2 : 2009.11.26 : Some updates for the script to work with changes in facebook javascripts - test conf = FF 3.5.5 + Yip 0.2 (stead of fluid) + GreaseMonkey 0.8.20090920.2

(function () {

		var currentTabMsgTotal = new Array();
		var currentTabTranscripts = new Array();
		
		function run() {
			var userID = unsafeWindow.presence.user;
			for (var i in unsafeWindow.chatDisplay.tabs) {

				currentTabTranscripts[i] = unsafeWindow.chatDisplay.histories[i];
				
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
					
					var senderName = unsafeWindow.ChatUserInfos[i].name;
					var icon = unsafeWindow.ChatUserInfos[i].thumbSrc;
					currentTabMsgTotal[i] = currentTabTranscripts[i].length;
					unsafeWindow.fluid.showGrowlNotification({
						title: senderName+' (Facebook):',
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
/*		
		function growlCallback(i) {
			unsafeWindow.activate();
			unsafeWindow.chatDisplay.tabs[i].tabHitAreaOnClick();
		} */
		
		setInterval(run, 3000);

//    }
})();