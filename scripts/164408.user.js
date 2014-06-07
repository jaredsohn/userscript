// ==UserScript==
// @name        Weixin (Fluid App) Notification
// @namespace   Weixin
// @description   [For Mac & Fluid] This script shows unread new message counts as dock badges for Weixin Fluid app with audio notification. Full version of Fluid app required.
// @include     http*://wx.qq.com/*
// @version     0.2
// @author Wang Zhipei (@ewangenius)
// ==/UserScript==

/* Changelog
2 Jun 2013: Updated to 0.2: fixed bugs of null object caused by "show more" column item on the bottom, added a new type (friend request message, message). fixed bugs that "lastCount" won't update when the new count is 0, and no sounds can be played when the current count is smaller than historical maximum.
*/

/*
This script checks incoming new messages, and attaches a badge to the Weixin Fluid app counting total unread message counts. It also play a system audio notification, if there are new unread messages from contacts other than public accounts or groups. Full version of Fluid app for OS X required.

This is the customised for Weixin Fluid app based on Weixin web client. Very preliminary. Please tolerate imperfect codes and ugly algorithm, and let me know for any improvements. You can get me in Weibo, Weixin, Twitter, Facebook, Gtalk and Skype via keyword @ewangenius.

About Fluid app: http://fluidapp.com
*/

window.fluid.dockBadge = '';
setTimeout(updateDockBadge, 1000);
setTimeout(updateDockBadge, 3000);
setInterval(updateDockBadge, 5000);

var badgeCount = 0; // for showing the badge counts
var lastCount = 0; // for comparing whether new messages' arrived 

function updateDockBadge() {
	var unreadCount = new Array(0,0,0,0,0); 
	//[contact, chatroom, public account, filehelper, friend request message](*, @chatroom, gh_, filehelper, fmessage)
	var username = ""; // or "un" as the key attribute indicator
	var j = 0; // for categorisation of different message types
	var chatList = document.getElementsByClassName("chatListColumn"); // the array contains all the chat partners
	for(var i=0;i < chatList.length; i++){
		username = chatList[i].getAttribute("username");
		if (username!= null){
			if (username.indexOf("fmessage") == 0){
				j = 4;
			}else if (username.indexOf("filehelper") == 0){
				j = 3;
			}else if (username.indexOf("gh_") == 0){
				j = 2;
			}else if (username.indexOf("chatroom") > 1){
				j = 1;
			}else{
				j = 0;
			}
			unreadCount[j] = unreadCount[j] + parseInt(chatList[i].getElementsByClassName("unreadDot")[0].innerHTML) ; // update the unread count for each category
		}
	}
	var totalUnreadCount = unreadCount[0] + unreadCount[1] + unreadCount[2] + unreadCount[3]  + unreadCount[4];

	if (totalUnreadCount == 0){
		window.fluid.dockBadge = '';
	}else{
		if (totalUnreadCount != badgeCount){
			if (unreadCount[0] > lastCount){
				window.fluid.playSound("Tink");
			}
			badgeCount = totalUnreadCount;
			window.fluid.dockBadge = badgeCount + ''; // turn integer to an string and update the badge
		}
	}
	lastCount = unreadCount[0];
}