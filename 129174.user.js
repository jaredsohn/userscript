// ==UserScript==
// @name           dAmnAnnounce
// @description    Global announcement script for dAmn.
// @author         Jonathon Braswell <jon_braswell12@yahoo.com>
// @version        1.0
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==
function announce() {
	var Announcer = {
		command: {
			announce: function(message) {
				for(var ns in dAmnChats) {
					dAmn_Send(ns,'msg main\n\n'+message);
				}
			}
		},
		init: function() {
			MiddleMan.Commands.bind("announce", 1, this.command.announce);
		},
	};
	Announcer.init();
}
var myScript = document.createElement('script');
myScript.innerHTML = '('+announce+')();';
document.getElementsByTagName('head')[0].appendChild(myScript);