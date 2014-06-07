// ==UserScript==
// @author 		   BetterJTV Dev
// @name           BetterJTV (Extended)
// @version 	   1.1
// @description    Enhances Justin.TV with new features, bug fixes, and reduced clutter.
// @namespace      http://www.betterjtv.com/
// @include        http://justin.tv/*
// @include        http://*.justin.tv/*
// @include        http://twitch.tv/*
// @include        http://*.twitch.tv/*
// ==/UserScript==

function betterjtv_init()
{
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "http://kobana.co.uk/betterjtv.js?"+Math.random();
	thehead = document.getElementsByTagName('head')[0];
	if(thehead) thehead.appendChild(script);
}

betterjtv_init();