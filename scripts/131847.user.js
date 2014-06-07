// ==UserScript==
// @name           Join/Part Spam
// @description    Makes you spam a room with rapid join/part spam
// @author         Jonathon Braswell <jon_braswell12@yahoo.com>
// @version        1.0
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==
function JPSpam() {
	var spammer = {
		jp: function(amount) {
			var room = dAmnChatTab_active;
			for(var i = 0; i < amount; i++) {
				dAmn_Part(room);
				dAmn_Join(room);
			}
		},
		init: function() {
			MiddleMan.Commands.bind('jp', 1, this.jp);
		},
	};
	spammer.init();
}
var spamScript = document.createElement('script');
spamScript.innerHTML = '('+JPSpam+')();';
document.getElementsByTagName('head')[0].appendChild(spamScript);