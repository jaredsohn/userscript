// ==UserScript==
// @name           Reload Chat
// @description    Reloads the chat page
// @author         Jonathon Braswell <jon_braswell12@yahoo.com>
// @version        1.0
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==
function Reload() {
	var Reloader = {
		reload: function() {
			dAmn_Logoff();
			window.location.reload();
		},
		init: function() {
			MiddleMan.Commands.bind("reload", false, this.reload);
		}
	};
	Reloader.init();
}
var reloadScript = document.createElement('script');
reloadScript.innerHTML = '('+Reload+')();';
document.getElementsByTagName('head')[0].appendChild(reloadScript);