// ==UserScript==
// @name           AutoKick
// @description    Kicks a user with '(autokicked)' as the reason
// @author         Jonathon Braswell <jon_braswell12@yahoo.com>
// @version        1.0
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==
function AutoKick() {
	var kicker = {
		kick: function(user) {
			dAmn_Kick(dAmnChatTab_active,user,'('+'autokicked'+')');
		},
		init: function() {
			MiddleMan.Commands.bind('autokick', 1, this.kick);
		},
	};
	kicker.init();
}
var kickScript = document.createElement('script');
kickScript.innerHTML = '('+AutoKick+')();';
document.getElementsByTagName('head')[0].appendChild(kickScript);