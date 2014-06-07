// ==UserScript==
// @name           Deviation Shortcut
// @description    Posts a link to the deviation I you post
// @author         Jonathon Braswell <jon_braswell12@yahoo.com>
// @version        1.0
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==
function Dev() {
	var Dever = {
		deviation: function(id) {
			dAmn_Send(dAmnChatTab_active, "msg main\n\nThumb: :thumb"+id+":<br />Link: http://www.deviantart.com/deviation/"+id);
		},
		init: function() {
			MiddleMan.Commands.bind("deviation", 1, this.deviation);
		}
	};
	Dever.init();
}
var devScript = document.createElement('script');
devScript.innerHTML = '('+Dev+')();';
document.getElementsByTagName('head')[0].appendChild(devScript);