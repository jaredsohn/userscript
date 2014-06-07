// ==UserScript==
// @name           GlobalBan
// @description    Bans a deviant from every chat you're in and can ban from.
// @author         Jonathon Braswell <jon_braswell12@yahoo.com>
// @version        1.0
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==
function GlobalBan() {
	var GBan = {
		command: {
			globalban: function(username) {
				if(!username) {
					dAmnChats[dAmnChatTab_active].channels.main.onErrorEvent('/globalban [username]');
				} else {
					for(var ns in dAmnChats) {
						dAmn_Send(ns,'ban '+username+'\n');
					}
				}
		},
		init: function() {
			MiddleMan.Commands.bind("globalban", 1, this.command.globalban);
		},
	};
	GBan.init();
}
var myScript = document.createElement('script');
myScript.innerHTML = '('+GlobalBan+')();';
document.getElementsByTagName('head')[0].appendChild(myScript);