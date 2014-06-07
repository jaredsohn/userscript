// ==UserScript==
// @name           	Kongregate Three-Way Messager
// @namespace      	tag://kongregate
// @description    	Allows for automatic whisper conversations between three people. "/3w username1 username2 message" to start a conversation, "/3w" to end it. "/s" or "/speak" to send a message to the chatroom without ending the conversation.
// @include        	http://www.kongregate.com/games/*
// @author         	ggppjj
// @version        	Release 4.5.3
// @date           	01/16/2012		
// @require 		http://sizzlemctwizzle.com/updater.php?id=123257
// ==/UserScript==
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Permission was give by MrSpontaneous to fork and edit as I wish, as long as I gave attribution to him.                                          //
// The main parts of the script were written by MrSpontaneous, with modifications by myself.                                                       //
// MrSpontaneous' Lisencing for his original "Two-Way Messenger" script is on his script (Which is awesome!).                                      //
// The liscensing for this script Is Creative Commons Attribution, non-commercial.                                                                 //
// The full text of the liscensing, including leagal Jargon, is at http://creativecommons.org/licenses/by-nc/3.0/                                  //
// This means, in short, that you are able to edit this code in any way you wish, just don't sell it, Attribute me (and MrSpontaneous, of course.),//
// and we'll be good.                                                                                                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// tl;dr: Use freely. Edit freely, but attribute.//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO:  //                                                                                              //
////////////                                                                                              //
// 1. AutoUpdater                 DONE                                      	                          //
// 2. Fix the double see thing.   SEE 6.                                                                  //
// 3. ???                         DONE                                                                    //
// 4. Profit!!!                                                                                           //
// 5. Get arrow out of knee.                                                                              ///////////////////////////////////////////////////////////
// 6. Implement this: active_dialogue.kongBotMessage( "Message to " + holodeck._three_way_recipient_one + " and " + holodeck._three_way_recipient_two  + message) ;//
// 7. Get bigger comment boxes.                                                                           ///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This Extension has Super-Cow powers!//
/////////////////////////////////////////
// Here we go!//
////////////////

 var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);


function init_three_way(){
	var CDialogue = dom.ChatDialogue,
		CRoom = dom.ChatRoom;
	var holodeck = dom.holodeck;
	
	if (CDialogue){
		CDialogue.prototype = dom.CDprototype||dom.ChatDialogue.prototype;
		CRoom.prototype = dom.CRprototype||dom.ChatRoom.prototype;
		
		if(!holodeck.__three_way){
			holodeck.__three_way = true;
			holodeck._three_way_recipient_one = null;
			holodeck._three_way_recipient_two = null;
			
			if (!CRoom.prototype.sendRoomMessage_thwOld){
				CRoom.prototype.sendRoomMessage_thwOld = CRoom.prototype.sendRoomMessage;
				CRoom.prototype.sendRoomMessage = function(message, force) {
					if (!force && this.holodeck()._three_way_recipient_one){
						this.holodeck().activeDialogue().sendPrivateMessage(this.holodeck()._three_way_recipient_one, message);
						if(this.holodeck()._three_way_recipient_two){
							this.holodeck().activeDialogue().sendPrivateMessage(this.holodeck()._three_way_recipient_two, message);
						
						}
						
						return;
					}
					this.sendRoomMessage_thwOld(message);
					
				}
			}
			
			//Called with: /3w <username1> <username2> [message]
			CDialogue.prototype.three_way = function (holodeck, input) {		
				var active_dialogue = holodeck.activeDialogue();
				
				var m = input.match(/^\/(\S+)\s+(\S+)\s+(\S+)\s?(.+)*/);
				
				if (!m) { //no params
					active_dialogue.kongBotMessage("Now ending 3-way conversation with " + holodeck._three_way_recipient_one + " and " + holodeck._three_way_recipient_two + ".");
					holodeck._three_way_recipient_one = null;
					holodeck._three_way_recipient_two = null;
					return false;
				}
				var username1 = m[2];
				var username2 = m[3];
				var message = m[4];
				
				if (username1 && username2) { //start 2way
					holodeck._three_way_recipient_one = username1;
					holodeck._three_way_recipient_two = username2;
					active_dialogue.kongBotMessage("Now starting 3-way conversation with " + username1 + " and " + username2 + ".");
				}
				
				if (username1 && username2 && message) { //if the user has defined a message, send it
					active_dialogue.sendPrivateMessage(username1, message);
					active_dialogue.sendPrivateMessage(username2, message);
					
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
			
			CDialogue.prototype.losegame = function (holodeck, input) {
				var g = input.match(/^\/g/);
				if (g) {
					holodeck.chatWindow().activeRoom().sendRoomMessage("!g", true);
				}
				return false;
			}
				
			CDialogue.prototype.superCow = function (holodeck, input) {
				var superCow = input.match(/^\/moo/);
				if (superCow) {
					alert("          (__) \n" + "          (oo) \n" + "   /------\\/  \n" + "  / |     || \n" + " * /\\---/\\ \n" + "   ~~  ~~ \n" + "....\"Have you mooed today?\"...");
				}
				return false;
			}
			
			holodeck.addChatCommand("3w", CDialogue.prototype.three_way);
			holodeck.addChatCommand("3way", CDialogue.prototype.three_way);
			
			holodeck.addChatCommand("s", CDialogue.prototype.speak);
			holodeck.addChatCommand("speak", CDialogue.prototype.speak);
			/////////////////////////////////////////
			// Special edits, just for The Crunchy.//
			/////////////////////////////////////////
			holodeck.addChatCommand("g", CDialogue.prototype.losegame);
			holodeck.addChatCommand("moo", CDialogue.prototype.superCow);
		}
	}
}

function check(){
	var injectScript = dom.injectScript||(document.getElementById("injectScriptDiv")?document.getElementById("injectScriptDiv").onclick():0);
	if(injectScript){
		injectScript(init_three_way, 200);
	} else if(!dom._promptedFramework && !/Chrome/i.test(navigator.appVersion)){
		if(confirm("You don't have the latest version of the framework-script!\n" + 
		           "Please install it, otherwise the scripts won't work.\n" +
		           "Clicking ok will open a new tab where you can install the script"))
			window.open("http://userscripts.org/scripts/show/54245", "_blank");
		dom._promptedFramework = true;
	}
}

setTimeout(check, 0);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Abu-dee, Abu-dee, Abu-dee, Abu-That's all, folks!//
//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Today's lecture: The Future of Stagnation is the Past's Version of Progress.//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  ggppjj(non interrupted):                                                                                                                       //
//	                                                                                                                                               //
//	Wanna know what amazes me?                                                                                                                     //
//	iPods don't have Flash support.                                                                                                                //
//	It's not that they don't support it that amazes me.                                                                                            //
//	It's the reasoning behind *why* they don't support it that makes me agog.                                                                      //
//	Steve Jobs said, in a press release, "The technology sucks. So no."                                                                            //
//	Because he didn't like what is and was an industry standard, and he had something that everyone wanted,                                        //
//  he removed it from his most popular products.                                                                                                  //
//                                                                                                                                                 //
//	And what do we benefit from this?                                                                                                              //
//	HTML5, cross-platform development tailored to the individual device, and (ultimately) stronger platforms with better applications.             //
//	While it is a lot more work for an individual who wants to develop for/on/with those platforms to port their code, *other* developers are      //
//  making it easier and more stable as time goes on.                                                                                              //
//                                                                                                                                                 //
//	Stencylworks is working to improve their already awesome flash development platform to support HTML5, iOS, and Android,                        //
//  and the Unity engine is making cross-platform code not only easy, but blindingly simple to go from online game to mobile game.                 //
//                                                                                                                                                 //
//	All because of the arrogance and "holier than thou" attitude of an old man with a vision.                                                      //
//	Not only are we moving away from flash, but we are embracing the more dynamic, less intensive alternatives with open arms.                     //
//	And no-one here (with a few exceptions) really knows about, cares about, notices, or understands any of it.                                    //
//	Which, in all reality, is beautiful.                                                                                                           //
//	The fact that the decisions of one man could so alter the world around him, and yet the majority of people don't even notice.                  //
//	It's like an atom bomb ran into the moon, and no-one thinks to look up to notice.                                                              //
//	It brings my mind to a halt.                                                                                                                   //
//	It gives me rest.                                                                                                                              //
//	At least, it gives me 15 minutes of talking to strangers without interruptions with oncefuzzy in the room.                                     //
//                                                                                                                                                 //
//  fludson: its working                                                                                                                           //
//                                                                                                                                                 //
//  ggppjj: It's worked.                                                                                                                           //
//                                                                                                                                                 //
//  ggppjj: I've finished.                                                                                                                         //
//                                                                                                                                                 //
//  ggppjj: Now to watch funny cat videos.                                                                                                         //
//                                                                                                                                                 //
//  ggppjj: Hahaha! Silly Calico! You don't belong in a box to Russia!                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

