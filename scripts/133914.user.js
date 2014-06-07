// ==UserScript==
// @name           Facebook LED Notifier
// @namespace      http://www.facebook.com/brysonreece
// @description    Script for the Facebook LED Notifier
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @version        1.0.1
// ==/UserScript==





var friendLED	= "1"	//LED - friend requests.     "-1" to disable.
var messagesLED	= "2"	//LED - inbox messages.	     "-1" to disable.
var notifLED 	= "3"	//LED - notifications.	     "-1" to disable.
var chatMsgLED	= "2"	//LED - chat messages.	     "-1" to disable.





function inArray(arr, find) {
	for (var i=0; i<arr.length; i++) {
		if (arr[i]===find) {
			return true;
		}
	}
}






function blinkLED(LED, state) {
	setTimeout(
		function()
		{
			GM_xmlhttpRequest({method: "GET", url: "http://127.0.0.1:4012/"+LED+"/"+state});
		},
	0);
}





if (top.location == self.location) {





//===============================================================================================
//New friend request blink
//===============================================================================================

	if (friendLED!="-1") {
		var friendCount = document.getElementById("jewelRequestCount");
		friendCount.addEventListener("DOMNodeInserted", function() {
			if (friendCount.innerHTML=="0") {
				blinkLED(friendLED, "off");
			}else if (friendCount.innerHTML!="0") {
				blinkLED(friendLED, "on");
			}
		}, false);
	}





//===============================================================================================
//New inbox message blink
//===============================================================================================

	if (messagesLED!="-1") {
		var messagesCount = document.getElementById("jewelInnerUnseenCount");
		messagesCount.addEventListener("DOMNodeInserted", function() {
			if (messagesCount.innerHTML=="0") {
				blinkLED(messagesLED, "off");
			}else if (messagesCount.innerHTML!="0") {
				blinkLED(messagesLED, "on");
			}
		}, false);
	}




	
//===============================================================================================
//New notifications blink
//===============================================================================================

	if (notifLED!="-1") {
		var jc = document.getElementsByClassName("jewelCount")[2];
		var notifCount = jc.getElementsByTagName("span")[0];
		notifCount.addEventListener("DOMNodeInserted", function() {
			if (notifCount.innerHTML=="0") {
				blinkLED(notifLED, "off");
			}else if (notifCount.innerHTML!="0") {
				blinkLED(notifLED, "on");
			}
		}, false);
	}





//===============================================================================================
//New chat message blink
//===============================================================================================





	if (chatMsgLED!="-1") {
		var last;
		var blacklist = new Array(); //for example: var blacklist = new Array("Joe Bloggs", "John Shmoe");
		
		window.addEventListener("load", function() {
			var newmsgs = new Array();
			var listener = function(event) {
				chat=document.getElementById('fbDockChatTabSlider');
				var msgs=chat.getElementsByClassName('numMessages');
				if (!last) {
					for (var i=0; i<msgs.length; i++) {
						if (msgs[i].innerHTML!="0" && msgs[i].innerHTML!='' && msgs[i].innerHTML!='<a xmlns="http://www.w3.org/1999/xhtml">0</a>' && msgs[i]!=last && !inArray(blacklist, msgs[i].previousSibling.getElementsByClassName('name')[0].innerHTML)) { //(msgs[i].innerHTML=="1" && msgs[i]!=last) { 
							last=i;
							blinkLED(chatMsgLED, "on");
							break;
						}
					}
				}
				if (last) {
					if (msgs[last].innerHTML=="0" || msgs[last].innerHTML=='<a xmlns="http://www.w3.org/1999/xhtml">0</a>') {
						blinkLED(chatMsgLED, "off");
						last=null;
					}
				}
			};
			setTimeout(
				function()
				{
					var chat=document.getElementById('fbDockChatTabSlider');
					if (!chat) GM_log("Could not get chat!");
					chat.addEventListener("DOMNodeInserted",listener, false);
				}, 5000);
		}, true);
	}
}