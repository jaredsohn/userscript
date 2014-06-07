// ==UserScript==
// @name           Auto Red Text
// @namespace      tag://kongregate
// @description    Automatically adds the code to link the player's chat.
// @include        *kongregate.com/games*
// @author         Hummerz5
// @version        1.0.0
// @date           06/22/2012
// @grant        none
// ==/UserScript==

var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);
var red_toggle = false;
var BBC_edit = false;
var prefix = "S";
function red_text_func() {
	var CDialogue = dom.ChatDialogue,
		CRoom = dom.ChatRoom,
	    CWindow = dom.ChatWindow;
	var holodeck = dom.holodeck;
	
	if (CDialogue){
		CDialogue.prototype = dom.CDprototype||dom.ChatDialogue.prototype;
		CRoom.prototype = dom.CRprototype||dom.ChatRoom.prototype;
		    CWindow = dom.ChatWindow;
		
		if(!holodeck.__two_way){
			holodeck.__two_way = true;
			holodeck._two_way_recipient = null;
			
			if (!CRoom.prototype.sendRoomMessage_twOld) {
				CRoom.prototype.sendRoomMessage_twOld = CRoom.prototype.sendRoomMessage;
				CRoom.prototype.sendRoomMessage = function(message, force) {
				if (BBC_edit == false) {
					if (red_toggle==true && message != "") {
					message = prefix + '["http://cdn2.kongregate.com/assets/resize-image/40x30/game_icons/0002/5061/404.png?992-op","2DArray/just-chatting","' + message + '"]'
					}
					}
				if (BBC_edit == true) {
					if (red_toggle==true && message != "") {
					// parse the BBC
					var begin = prefix + '["http://cdn2.kongregate.com/assets/resize-image/40x30/game_icons/0002/5061/404.png?992-op","2DArray/just-chatting","';
					var end = '"]';
						for (i=0; i<=10; i++) {
							message = message.replace("[r]", begin);
							message = message.replace("[/r]", end);
				} // for
				} // if
				} // if
					if (!force && this.holodeck()._two_way_recipient){
						this.holodeck().activeDialogue().sendPrivateMessage(this.holodeck()._two_way_recipient, message);
						return;
					}
					this.sendRoomMessage_twOld(message);

				}
			}
				


			if(!CWindow.prototype.oldSendPrivateMessageAFK){ 
				CWindow.prototype.oldSendPrivateMessageAFK = CWindow.prototype.sendPrivateMessage;
				CWindow.prototype.sendPrivateMessage = function(user, msg){
				if (BBC_edit == false) {
					if (red_toggle==true && msg != "") {
					msg = prefix+'["http://cdn2.kongregate.com/assets/resize-image/40x30/game_icons/0002/5061/404.png?992-op","2DArray/just-chatting","' + msg + '"]'
					}
					}
				if (BBC_edit == true) {
					if (red_toggle==true && msg != "") {
					// parse the BBC
					var begin = prefix+ '["http://cdn2.kongregate.com/assets/resize-image/40x30/game_icons/0002/5061/404.png?992-op","2DArray/just-chatting","';
					var end = '"]';
						for (i=0; i<=5; i++) {
							msg = msg.replace("[r]", begin);
							msg = msg.replace("[/r]", end);
				} // for
				} // if
				} // if
					this.oldSendPrivateMessageAFK(user, msg);
				}
			}

			

			holodeck.addChatCommand("red", function(l, n){
			var m = n.match(/^\/\S+\s+(\S+)/);
			var o = n.match(/^\/\S+\s+(\d+)\s+(\d+)(?:\s+(\d+))?/);
			if (!m) {
				if (red_toggle==true) {
					red_toggle = false;
					msg = "Red Text is off.";
				}
			else
				{
					red_toggle = true;
					msg = "Red Text is on.";
				}
				 /* var msg = "Red Text Toggled"; */
				l.activeDialogue().kongBotMessage(msg);
				}
				return false;
 		});

			holodeck.addChatCommand("redbbc", function(l, n){
			var m = n.match(/^\/\S+\s+(\S+)/);
			var o = n.match(/^\/\S+\s+(\d+)\s+(\d+)(?:\s+(\d+))?/);
			if (!m) {
					if (BBC_edit==true) {
					BBC_edit = false;
				l.activeDialogue().kongBotMessage("BBCodes are disactivated.");
				}
			else
				{
					BBC_edit = true;
				l.activeDialogue().kongBotMessage("BBCodes are activated.");
				}



		} // !M
		return false;	
		});
		holodeck.addChatCommand("about", function(l, n) {
			var m = n.match(/^\/\S+\s+(\S+)/);
			var o = n.match(/^\/\S+\s+(\d+)\s+(\d+)(?:\s+(\d+))?/);		
		l.activeDialogue().kongBotMessage("Redirecting.");
		window.open("http://athconnect.elementfx.com/");
		return false;
		});

		holodeck.addChatCommand("redswitch", function(l, n) {
			var m = n.match(/^\/\S+\s+(\S+)/);
			var o = n.match(/^\/\S+\s+(\d+)\s+(\d+)(?:\s+(\d+))?/);		
		if (prefix=="S"){
			prefix="s";
			var response = "Image and text will be used on red chat speech.";
		}
		else
		{
			prefix="S";
			var response = "Text only will be used on red chat speech.";
		}
		l.activeDialogue().kongBotMessage(response);
		return false;
		});


		}
	}
}


red_text_func();

