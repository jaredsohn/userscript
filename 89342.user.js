// ==UserScript==
// @name          Clockwork Llama 2.0
// @namespace     Nuck
// @description   Clockwork Llama 2.0 Release Candidate 1
// @include       http://chat.deviantart.com/chat/*
// ==/UserScript==
(function(){
	$ = unsafeWindow.jQuery;
	var datetime = new Date().getTime();

	if(!document.getElementById("MiddleMan"))
	{
		var MMScript 			= document.createElement('script');
			MMScript.id 		= "MiddleMan";
			MMScript.src 		= 'http://sumopiggy.24bps.com/damn/middleman/middleman.js?MMdate='+datetime;
			document.getElementsByTagName('head')[0].appendChild(MMScript);
	}


	if(!document.getElementById("cwScript"))
	{
		var cwScript 			= document.createElement('script');
			cwScript.id 		= "cwScript";
			cwScript.src 		= 'http://userscripts.org.nyud.net/scripts/source/89341.user.js';
			document.getElementsByTagName('head')[0].appendChild(cwScript);
	}
})();