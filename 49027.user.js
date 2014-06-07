// ==UserScript==
// @name           AFK-command (for Chrome)
// @namespace      ventero.de
// @description    Chrome-version of this script: http://userscripts.org/scripts/show/48936 Adds an /afk-command to Kongregate's chat, which will flag you as afk. When flagged as afk, you automatically send a notice to the user who whispered you.
// @include        http://www.kongregate.com/games/*
// @author         Ventero
// ==/UserScript==

// Written by Ventero (http://www.kongregate.com/accounts/Ventero) 05/12/09
// Copyright (c) 2009-2012 Ventero, licensed under MIT/X11 license
// http://www.opensource.org/licenses/mit-license.php
// Thanks to Jabor (http://www.kongregate.com/accounts/Jabor) for the idea of adding a prefix!


function init(){
	if(location.href.indexOf("http://www.kongregate.com/games/")==0){
		holodeck.addChatCommand("afk",function (l, n) { if (l._afk == 0) { l._afk = 1; l.activeDialogue().displayMessage("Kong Bot", "You are now flagged as AFK", {class: "whisper received_whisper"}, {non_user: true}); } else {l._afk = 0; l.activeDialogue().displayMessage("Kong Bot", "You aren't flagged as AFK anymore", {class: "whisper received_whisper"}, {non_user: true}); } return false; });

		holodeck.addChatCommand("afkmessage", function (l, n){ var z = n.match(/^\/\S+\s+(.+)/); if (z){a = z[1]}else{a="I am currently AFK"} l._afkmessage = a; l.activeDialogue().displayMessage("Kong Bot", "AFK-message set to: "+a, {class: "whisper received_whisper"}, {non_user: true}); return false});

		holodeck.addChatCommand("afktoggle", function(l, n){ if (l._afktoggle == 0) {l._afktoggle = 1; l.activeDialogue().displayMessage("Kong Bot", "Your AFK-flag won't get removed automatically", {class: "whisper received_whisper"}, {non_user: true})} else {l._afktoggle = 0; l.activeDialogue().displayMessage("Kong Bot", "Your AFK-flag gets removed automatically", {class: "whisper received_whisper"}, {non_user: true})} return false; });

		ChatDialogue.prototype.oldKeyPress = ChatDialogue.prototype.onKeyPress;

		ChatDialogue.prototype.onKeyPress = function (a) { if (a.which == 13) { if(this._holodeck._afktoggle==0 && this._input_node.getValue().indexOf("/afk")!=0){this._holodeck._afk = 0}; this.sendInput(); a.stop(); } else{this.oldKeyPress(a)}};

		ChatDialogue.prototype.receivedPrivateMessage = function (a) { if (a.data.success) { nL=a.data.from;this.displayUnsanitizedMessage(a.data.from, this.sanitizeIncomingMessage(a.data.message) + "&nbsp; (<a class=\"reply_link\" onclick=\"holodeck.insertPrivateMessagePrefixFor('" + a.data.from + "');return false;\" href=\"#\">reply</a>)", {class: "whisper received_whisper"});if(this._holodeck._afk && a.data.message.indexOf(this._holodeck._afkprefix)!=0){this.sendPrivateMessage(a.data.from, this._holodeck._afkprefix+this._holodeck._afkmessage)}; } else { this.displayMessage("Kong Bot", a.data.to + " can not be reached. Please try again later.", {class: "whisper received_whisper"}, {non_user: true}); } };

		holodeck._afk = 0;

		holodeck._afktoggle = 0;

		holodeck._afkmessage = "I am currently AFK";

		holodeck._afkprefix = "[AFK] ";
	}
}

setTimeout(init, 1000);

