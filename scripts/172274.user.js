// ==UserScript==
// @name           AwesomeJTV
// @version 	   1.2
// @description    Enhances Justin.TV with new features, bug fixes, and reduced clutter.
// @include        http://justin.tv/*
// @include        http://*.justin.tv/*
// @include        http://twitch.tv/*
// @include        http://*.twitch.tv/*
// ==/UserScript==

(function() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "http://www.demonicgamers.com/awesomejtv.js";
	var thehead = document.getElementsByTagName('head')[0];
	if(thehead) thehead.appendChild(script);
})();