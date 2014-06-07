// ==UserScript==
// @name           Disconnect
// @description    Kills your connection
// @author         Jonathon Braswell <jon_braswell12@yahoo.com>
// @version        1.0
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==
function Quit() {
	var Quitter = {
		quit: function() {
			dAmn_Logoff();
			close();
		},
		init: function() {
			MiddleMan.Commands.bind("quit", false, this.quit);
		}
	};
	Quitter.init();
}
var quitScript = document.createElement('script');
quitScript.innerHTML = '('+Quit+')();';
document.getElementsByTagName('head')[0].appendChild(quitScript);