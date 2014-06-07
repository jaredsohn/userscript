// ==UserScript==
// @name           	CrunchyBot Extender Script.
// @description    	Adds functionality to CrunchyBot!
// @include        	http://www.kongregate.com/games/*
// @author         	ggppjj
// @version        	Public Release 4.0		
// ==/UserScript==
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
//                                                                                                                 //                                                                                                                                                 //
//                                                                                                                 // 
//                                                                                                                 //
//                                                                                                                 //
// The liscensing for this script Is Creative Commons Attribution, NonCommercial, NoDeritives                      //
// 3.0 Unported (CC BY-NC-ND 3.0), the full text of which can be found here:                                       //
// http://creativecommons.org/licenses/by-nc-nd/3.0/                                                               //
//                                                                                                                 // 
//                                                                                                                 //
//                                                                                                                 //
//                                                                                                                 //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// tl;dr: Share freely, but don't sell or edit without permission. //                                                 
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO:  //                                                                                              //
////////////                                                                                              //
// 1. Add secrets!                                                 	                                      //
// 2.                                                                                                     //
// 3.                                                                                                     //
// 4.                                                                                                     //
// 5.                                                                                                     //
// 6.                                                                                                     //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Here we go!//
////////////////
var s = document.createElement("script");

s.textContent = "(" + function(){
	var	backLogMessages = new Array();
	var	backLogUsers = new Array();
	var	foobar = new Array();
	var	isRunning = 0;
	var	ED = 0;
	var	startRecieving = 0;
	var	foobarTester = 0;
	var	receiving = 0;
	var	gogogo = 1;
	ChatDialogue.prototype.__displayUnsanitizedMessageOldBot = ChatDialogue.prototype.displayUnsanitizedMessage;
	var	currentArrayNumber = 1;
	console.log( "Loaded: Crunchybot Backlog extender.");
	console.log( "Injected successfully.");
	chat = document.getElementsByClassName("chat_message_window");

ChatDialogue.prototype.displayUnsanitizedMessage = function(username, message, attributes, options) {
	if ((/To use this, please install this script \(Note\: If in Firefox\, you may need to install Greasemonkey\. Google it\.\)\: http\:\/\/goo\.gl\/i5yvj/i.test(message)) && (/^Crunchy_Bot/.test(username))){
			holodeck.chatWindow().sendPrivateMessage(username, "CBI BL");
			console.log( "Sent BL.");
			receiving = 1;
			return;
	}
	if((/^Crunchy_Bot/.test(username)) && (receiving == 1)) {
		if (/^BLMN(.+)\=\^\+\=(.+)(?:\&nbsp;)/.test(message)){
			var matcher = message.match(/^BLMN(.+)\=\^\+\=(.+)(?:\&nbsp;)/);
			herpderp = matcher[1],
			derpherp = matcher[2],
			backLogUsers[currentArrayNumber] = herpderp;
			backLogMessages[currentArrayNumber] = derpherp;
			++currentArrayNumber;
		}
		else if (/^BL DONE/.test(message)){
			currentArrayNumber = 1;
			receiving = 0;
			injectLogs();
		}
		else {
			var matcher = message.match(/^(.+)(?:\&nbsp;)/i),
				herpderp = matcher[1];
			if (herpderp.length < 30){
				backLogUsers[currentArrayNumber] = herpderp;
			}
			else {
				backLogMessages[currentArrayNumber] = herpderp;
				++currentArrayNumber;
			};
		};
		return;
	}
	this.__displayUnsanitizedMessageOldBot.apply(this, arguments);
};
		holodeck._event_dispatcher.register(KonduitEvent.PRIVATE_MESSAGE, function(event) {
			var	message = event.data.message,
				sender = event.data.from;
			if (ED == 0){
				console.log( "Event Dispacher on.");
				ED = 1;
			};
			if(event.data.success){
				if (/^Backlog Beginning/i.test(message)){
					if(/^Crunchy_Bot/.test(sender)){
							console.log( "Recieving.");
							receiving = 1;
					}
					else {
						holodeck.chatWindow().sendPrivateMessage(sender, "Nope.")
					};
				};
			};
		});
	function injectLogs(){
		if (gogogo == 1) {
			if (!backLogMessages[currentArrayNumber]){
				gogogo = 0;
				console.log( "Reset.");
				currentArrayNumber = 1;
			}
			else{
				username = backLogUsers[currentArrayNumber];
				message = backLogMessages[currentArrayNumber];
				holodeck._active_dialogue.displayUnsanitizedMessage( username, "[BL]: " + message);
				console.log("At line " + currentArrayNumber + ".");
				++currentArrayNumber;
				injectLogs();
			};
		};
	};
} + ")();"
setTimeout(function(){
	document.body.appendChild(s);
	document.body.removeChild(s);
}, 0);