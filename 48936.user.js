// ==UserScript==
// @name           AFK-command
// @namespace      tag://kongregate
// @description    Adds an /afk-command to Kongregate's chat, which will flag you as afk. When flagged as afk, you automatically send a notice to the user who whispered you.
// @include        http://www.kongregate.com/games/*
// @author         Ventero
// @version        1.9.11
// @date           06.04.2013
// @require        http://kong.ventero.de/updates/48936.js
// ==/UserScript==

// Written by Ventero (http://www.kongregate.com/accounts/Ventero) 05/12/09
// Copyright (c) 2009-2013 Ventero, licensed under MIT/X11 license
// http://www.opensource.org/licenses/mit-license.php

var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);

function init_afk(){
	var AUTOAFK = "kongregate_autoAFKTimeout";

	var holodeck = dom.holodeck,
	    CDialogue = dom.ChatDialogue,
	    CRoom = dom.ChatRoom,
	    CWindow = dom.ChatWindow,
	    Base64 = dom.Base64;

	if(holodeck && CDialogue){
		CDialogue.prototype = dom.CDprototype||dom.ChatDialogue.prototype;
		CRoom.prototype = dom.CRprototype||dom.ChatRoom.prototype;
		CWindow.prototype = dom.CWprototype||dom.ChatWindow.prototype;

		if(!holodeck.__afk){
			holodeck.__afk = true;
			if(!holodeck.setPresenceAwayOld){
				holodeck.setPresenceAwayOld = holodeck.setPresenceAway;
				holodeck.setPresenceAway = function(){
					this._afk = 1;
					this.setPresenceAwayOld();
				}
			}
			if(!holodeck.setPresenceChatOld){
				holodeck.setPresenceChatOld = holodeck.setPresenceChat;
				holodeck.setPresenceChat = function(){
					this._afk = 0;
					this.setPresenceChatOld();
				}
			}

			if(!CRoom.prototype.updateUserOld_AFK){
				CRoom.prototype.updateUserOld_AFK = CRoom.prototype.updateUser;
				CRoom.prototype.updateUser= function(user){
					this.updateUserOld_AFK.apply(this, arguments);
					if(user.username == this._chat_window.username()){
						if(this._presence != user.variables.presence){
							switch(user.variables.presence){
								case "chat":
									if(!this._chat_window._holodeck._afktoggle)
										this._chat_window._holodeck._afk = 0;
									break;
								case "away":
									this._chat_window._holodeck._afk = 1;
									break;
							}
						}
					}
				}
			}

			holodeck._chat_commands.afk[0] = function (l, n) { if (l._afk == 0) {l.setPresenceAway()} else {l.setPresenceChat()} return false; }
			holodeck._chat_commands.back[0] = function(l,n){l.setPresenceChat(); return false};

			holodeck.addChatCommand("afkmessage", function (l, n){ var z = n.match(/^\/\S+\s+(.+)/); if (z){a = z[1]}else{a="I am currently AFK"} l._afkmessage = a; l.activeDialogue().kongBotMessage("AFK-message set to: "+a); return false});

			holodeck.addChatCommand("afktoggle", function(l, n){ if (l._afktoggle == 0) {l._afktoggle = 1; l.activeDialogue().kongBotMessage("Your AFK-flag won't get removed automatically")} else {l._afktoggle = 0; l.activeDialogue().kongBotMessage("Your AFK-flag will be removed automatically")} return false; });

			holodeck.addChatCommand("autoafk", function(l, n){
				var match = n.match(/^\/autoafk\s+(\d+)/),
					  timeout = 15;

				if(match && match[1]){
					timeout = parseInt(match[1], 10);
				}

				l._autoAFK = timeout*60*1000;
				window.setTimeout(function(){GM_setValue(AUTOAFK, timeout)}, 0);

				if(l._autoAFKTimeout){
					clearTimeout(l._autoAFKTimeout);
				}

				if(timeout){
					l.activeDialogue().kongBotMessage("Set auto-AFK timeout to " + timeout + " minute" + (timeout > 1?"s":""));
					l._autoAFKTimeout = setTimeout(function(a){a.setPresenceAway();}, l._autoAFK, l);
				} else {
					l.activeDialogue().kongBotMessage("Disabled auto-AFK");
				}

				return false;
			});

			holodeck.checkAFK = function(){
				if(!this._afktoggle){
					this._afk = 0;
				}
				if(this._autoAFKTimeout){
					clearTimeout(this._autoAFKTimeout);
				}
				if(this._autoAFK){
					this._autoAFKTimeout = setTimeout(function(a){a.setPresenceAway();}, this._autoAFK, this);
				}
			}

			holodeck.addOutgoingMessageFilter(function(message, nextFunction){
				holodeck.checkAFK();
				nextFunction(message, nextFunction);
			});

			// Outgoing whispers aren't filtered (yet), so check them manually...
			if(!CWindow.prototype.oldSendPrivateMessageAFK){
				CWindow.prototype.oldSendPrivateMessageAFK = CWindow.prototype.sendPrivateMessage;
				CWindow.prototype.sendPrivateMessage = function(user, msg){
					if(msg.indexOf(this._holodeck._afkprefix)!=0){
						this._holodeck.checkAFK();
					}
					this.oldSendPrivateMessageAFK(user, msg);
				}
			}

			// Create setTimeout on session reconnect
			if(!CWindow.prototype.onLoginOldAFK){
				CWindow.prototype.onLoginOldAFK = CWindow.prototype.onLogin;
				CWindow.prototype.onLogin = function(){
					this.onLoginOldAFK();
					if(this._holodeck._afk) {
						this._holodeck.setPresenceAway();
					} else {
						this._holodeck.setPresenceChat();
						this._holodeck.checkAFK();
					}
				}
			}

			if(!CDialogue.prototype.reply){
				CDialogue.prototype.reply = function(a){}
			}

			if(!CDialogue.prototype.showReceivedPM){
				CDialogue.prototype.showReceivedPM = CDialogue.prototype.receivedPrivateMessage;
			}

			CDialogue.prototype.receivedPrivateMessage = function(a){
				if (a.data.success){
					this.reply(a.data.from);
					if(this._holodeck._afk && Base64.decode(a.data.message).indexOf(this._holodeck._afkprefix)!=0){this.sendPrivateMessage(a.data.from, this._holodeck._afkprefix+this._holodeck._afkmessage)}
				}
				this.showReceivedPM(a);
			}

			holodeck._afk = 0;

			holodeck._afktoggle = 0;

			holodeck._afkmessage = "I am currently AFK";

			holodeck._afkprefix = "[AFK] ";

			var autoAFK = 15;

			try{
				if(GM_setValue){
					autoAFK = GM_getValue(AUTOAFK, 15);
				}else{
					GM_setValue = function(a,b){};
				}
			}catch(e){
				GM_setValue = function(a,b){};
			}

			holodeck._autoAFK = autoAFK*60*1000;
			if(holodeck._autoAFK > 0){
				holodeck._autoAFKTimeout = setTimeout(function(a){a.setPresenceAway();}, holodeck._autoAFK, holodeck);
			}
		}
	}
}

function check(){
	var injectScript = dom.injectScript||(document.getElementById("injectScriptDiv")?document.getElementById("injectScriptDiv").onclick():0);
	if(injectScript){
		injectScript.call(dom, init_afk, 0);
	} else if(!dom._promptedFramework && !/Chrome/i.test(navigator.appVersion)){
		if(confirm("You don't have the latest version of the framework-script!\n" +
		           "Please install it, otherwise the scripts won't work.\n" +
		           "Clicking ok will open a new tab where you can install the script"))
			window.open("http://userscripts.org/scripts/show/54245", "_blank");
		dom._promptedFramework = true;
	}
}

setTimeout(check, 0);
