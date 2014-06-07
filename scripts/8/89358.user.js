// ==UserScript==
// @name          Clockwork Llama Version Check
// @namespace     Nuck
// @description   Moderator Extension: Displays the versions of Clockwork Llama that people are running.
// @include       http://chat.deviantart.com/chat/*
// ==/UserScript==
(function(){
	unsafeWindow.MiddleMan.Event.bind("dAmnChat_recv", "msg", "clockwork_showVersions", function(packet){
		if (packet.body.indexOf('&abbr\tCWL::')>-1) {
			packet.body = packet.body.replace(/&abbr\tCWL::([^\t]+)\t&\/abbr\t/g,"&sub\t &ndash;$1&\/sub\t");
		}
		return packet;
	});
})();