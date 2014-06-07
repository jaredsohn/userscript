// ==UserScript==
// @name           Explode
// @description    Explodes what you say into many lines
// @author         Jonathon Braswell <jon_braswell12@yahoo.com>
// @version        1.0
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==
function Explode() {
	var Msg = {
		command: {
			say: function(msg) {
				tosay = msg.split(" ");
				for(var i in tosay) {
					dAmn_Send(dAmnChatTab_active, 'msg main\n\n'+tosay[i]);
				}
			}
		},
		init: function() {
			MiddleMan.Commands.bind("explode", 1, this.command.say);
		},
	};
	Msg.init();
}
var explodeScript = document.createElement('script');
explodeScript.innerHTML = '('+Explode+')();';
document.getElementsByTagName('head')[0].appendChild(explodeScript);