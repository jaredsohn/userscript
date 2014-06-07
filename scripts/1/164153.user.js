// ==UserScript==
// @name        	Facebook Bubbled Chat
// @namespace   	facebook
// @description		Changes the Facebook Chat Window to a Styled Window with Bubbles (like the iOS Messenger App)
// @version     	v1.2.3
// @author			iLendSoft
// @email			ilendemli@live.at
// @homepage       	http://ils.eu.gg/?menu=Projects&id=21
// @updateURL		http://userscripts.org/scripts/source/164153.meta.js
// @downloadURL		http://userscripts.org/scripts/source/164153.user.js
// @icon           	http://s3.amazonaws.com/uso_ss/icon/164153/large.PNG
// @include			htt*://*.facebook.*
// @exclude			*ajax*
// @exclude			*ticker*
// @exclude			*plugins*
// @exclude 		*ak.facebook.*
// @exclude 		*ai.php*
// ==/UserScript==

function main () {
	var rounded = false;

	var style = '\
		.hide {\
			display: none !important;\
		}\
		.chat_background {\
			background: #EDEFF4;\
		}\
		.hide_seperator {\
			border-top: none;\
		}\
		.messages_right {\
			float: right;\
			margin-right: 5px;\
		}\
		.message_sent {\
			background-color: #DBEDFE;\
			float: right;\
			clear: both;\
			max-width: 185px;\
			border-color: rgba(0, 0, 0, 0.18) rgba(0, 0, 0, 0.18) rgba(0, 0, 0, 0.29);\
			border-style: solid;\
			border-width: 1px;\
			padding: 4px 6px 4px 5px;\
		}\
		 .profile_pic_mod {\
			background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yb/r/yGu7SrADS5b.png");\
			background-position: -267px -187px;\
			background-repeat: no-repeat;\
			background-size: auto auto;\
			height: 35px;\
			width: 35px;\
			padding-top: 2px;\
			padding-left: 2px;\
		}\
		.messages_left {\
			float: left;\
			margin-top: 2px;\
		}\
		.message_received {\
			clear: both;\
			background-color: #F7F7F7;\
			float: left;\
			max-width: 150px;\
			border-color: rgba(0,0,0,0.18) rgba(0,0,0,0.18) rgba(0,0,0,0.29);\
			border-style: solid;\
			border-width: 1px;\
			padding: 4px 6px 4px 5px;\
		}\
		.fbDockChatTabFlyout {\
			height: 490px !important;\
		}\
		._kso {\
			margin-left: 1px;\
			margin-bottom: 3px;\
		}\
		._56oy ._55pk {\
			max-width: 150px;\
		}\
		._50ke{\
			position: absolute;\
		}';
		
	if(rounded) {
		style += '\
			.message_received, .message_sent {\
				border-radius: 5px;\
			}\
		';
	}

	var youArray = new Array("Du", "You");

	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = style;
	document.body.appendChild(css);
	
	var checkExist = setInterval(function() {
		var elem = document.getElementById("ChatTabsPagelet");
		if(elem) {
			clearInterval(checkExist);
			elem.addEventListener('DOMNodeInserted', nodeInserted, false);
		}
	}, 100);
	
	function nodeInserted(event) {
		var curevent = event.target;
		
		if(curevent.className.search(/(^|\s)fbChatConvItem($|\s)/) != -1) {
			addClass('hide_seperator', curevent);
			
		} else if(curevent.getAttribute('data-jsid').search(/(^|\s)message($|\s)/) != -1) {
			var message = curevent;
		
			var timeContainer = message.parentNode.childNodes[0];
			var tempTime = timeContainer.childNodes[1].innerHTML;
			addClass('hide', timeContainer);
			
			message.title = tempTime;
		
			var senderImage = curevent.parentNode.parentNode.childNodes[0].childNodes[1];
			var sender = senderImage.getAttribute("aria-label");

			if(youArray.indexOf(sender) != -1){
				addClass('hide', senderImage);
				addClass('messages_right', message);
				addClass('message_sent', message);
				
			} else {
				addClass('profile_pic_mod', senderImage);
				addClass('messages_left', message);
				addClass('message_received', message);
			}
		}
	}
	
	function addClass(classname, element) {
		var cn = element.className;
		if(cn.indexOf(classname) != -1) { return; }
		if(cn != '') { classname = ' '+classname; }
		element.className = cn +classname;
	}
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);

/*
	v1.2.3:
		Added icon
		Added rounded corners (change rounded variable to true)
		Fixed one small bug
		
	v1.2.2:
		Fixed Facebook Sticker not showing by using Regular Expressions instead of indexOf()
		
	v1.2.1:
		Forgot to add the tooltips, added now

	v1.2:
		Entirely rewritten the code
		Removed jQuery
		Bugs causing not loading the Feed and Messages are solved now

	v1.1:
		Added tooltips to each message which shows the send or received time of the message
		added an array for the translations of the "You"-word
		added @start-at to load script before the website actually loads
		added description
		removed DOMNodeRemoved

	v1.0:
		Initial Release
		This one currently only supports German and Englisch
*/