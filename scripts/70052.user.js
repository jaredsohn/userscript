// ==UserScript==
// @name           Kongregate two-way messager
// @namespace      tag://kongregate
// @description    Allows for automatic whisper conversations, negating the need for having to constantly enter /w username to talk to the same person.  "/2w username message" to start a conversation, "/2w" to end it. "/s" or "/speak" to send a message to the chatroom without ending the conversation.
// @include        http://www.kongregate.com/games/*
// @author         MrSpontaneous
// @version        1.0
// @date           02/27/2010
// ==/UserScript==
// You cannot modify or redistribute this script without permission.

// Written by MrSpontaneous (http://www.kongregate.com/accounts/MrSpontaneous) 02/27/2010
// Special thanks to Ventero for his regex advice
// Updated 08/15/2010 - Fixed unnecessary update alerts in Firefox 4 under some conditions

var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);

function init_two_way() {
	var CDialogue = dom.ChatDialogue,
		CRoom = dom.ChatRoom;
	var holodeck = dom.holodeck;
	
	if (CDialogue){
		CDialogue.prototype = dom.CDprototype||dom.ChatDialogue.prototype;
		CRoom.prototype = dom.CRprototype||dom.ChatRoom.prototype;
		
		if(!holodeck.__two_way){
			holodeck.__two_way = true;
			holodeck._two_way_recipient = null;
			
			if (!CRoom.prototype.sendRoomMessage_twOld) {
				CRoom.prototype.sendRoomMessage_twOld = CRoom.prototype.sendRoomMessage;
				CRoom.prototype.sendRoomMessage = function(message, force) {
					if (!force && this.holodeck()._two_way_recipient){
						this.holodeck().activeDialogue().sendPrivateMessage(this.holodeck()._two_way_recipient, message);
						return;
					}
					this.sendRoomMessage_twOld(message);
				}
			}
			
			//Called with: /2w <username> [message]
			CDialogue.prototype.two_way = function (holodeck, input) {		
				var active_dialogue = holodeck.activeDialogue();
				
				var m = input.match(/^\/(\S+)\s+(\S+)\s?(.+)*/);
				
				if (!m) { //no params
					active_dialogue.kongBotMessage("Now ending 2-way conversation with " + holodeck._two_way_recipient);
					holodeck._two_way_recipient = null;
					return false;
				}
				
				var username = m[2];
				var message = m[3];
				
				if (username) { //start 2way
					holodeck._two_way_recipient = username;
					active_dialogue.kongBotMessage("Now starting 2-way conversation with " + username);
				}
				
				if (username && message) { //if the user has defined a message, send it
					active_dialogue.sendPrivateMessage(username, message);
				}
				return false;
			}
			
			CDialogue.prototype.speak = function (holodeck, input) {
				var m = input.match(/^\/\S+\s+(.+)/);
				if (m) {
					holodeck.chatWindow().activeRoom().sendRoomMessage(m[1], true);
				}
				return false;
			}
			
			holodeck.addChatCommand("2w", CDialogue.prototype.two_way);
			holodeck.addChatCommand("2way", CDialogue.prototype.two_way);
			
			holodeck.addChatCommand("s", CDialogue.prototype.speak);
			holodeck.addChatCommand("speak", CDialogue.prototype.speak);

		}
	}
}

function check(){
	var injectScript = dom.injectScript||(document.getElementById("injectScriptDiv")?document.getElementById("injectScriptDiv").onclick():0);
	if(injectScript){
		injectScript(init_two_way, 200);
	} else if(!dom._promptedFramework && !/Chrome/i.test(navigator.appVersion)){
		if(confirm("You don't have the latest version of the framework-script!\n" + 
		           "Please install it, otherwise the scripts won't work.\n" +
		           "Clicking ok will open a new tab where you can install the script"))
			window.open("http://userscripts.org/scripts/show/54245", "_blank");
		dom._promptedFramework = true;
	}
}

setTimeout(check, 0);
