// ==UserScript==
// @name           Youtube video enabler.
// @namespace      http://mywebsite.com/myscripts
// @description    Makes youtube useable with mplayerplug-in and NoScript
// @include        http://youtube.com/*
// @include        http://www.youtube.com/*

// Based on a youtube download script from userscripts.org by by Binny V A (http://www.openjs.com/)
// Modified by medha (badcode.de) I hate Flash and I don't like JavaScript, still I want to waste my time.

// ==/UserScript==


(function() {
	if(document.getElementById('playerDiv') && document.getElementById('playerDiv').getElementsByTagName('embed')) {
		var warning = document.getElementById('playerDiv').getElementsByTagName('div')[0];
		warning.innerHTML = ""
		var s = document.getElementById('interactDiv').getElementsByTagName('script')[0].text;
		tmp= s.split("\"")[1];
		var query = tmp.substr(tmp.indexOf("?")+1);
		var embed = document.createElement('embed');
		embed.src="/get_video?" + query;
		embed.Width="500";
		embed.Height="500";
		document.getElementById('playerDiv').appendChild(embed);
	}
})();
