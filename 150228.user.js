// ==UserScript==
// @name           Away Evader
// @description    Evades away messages
// @author         Jonathon Braswell <jon_braswell12@yahoo.com>
// @version        1.0
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==
function Evade() {
	var Evader = {
		evade: function(message) {
			dAmn_Send(dAmnChatTab_active, "msg main\n\n"+message+" <abbr title='away'></abbr>");
		},
		init: function() {
			MiddleMan.Commands.bind("evade", 1, this.evade);
		}
	};
	Evader.init();
}
var evadeScript = document.createElement('script');
evadeScript.innerHTML = '('+Evade+')();';
document.getElementsByTagName('head')[0].appendChild(evadeScript);