// ==UserScript==
// @author 	   BetterJTV Dev
// @name           BetterJTV 5.18.2013 Fix
// @version 	   1.2
// @description    Enhances Justin.TV with new features, bug fixes, and reduced clutter.
// @namespace      http://www.betterjtv.com//
// @include        http://justin.tv/*
// @include        http://*.justin.tv/*
// @include        http://twitch.tv/*
// @include        http://*.twitch.tv/*
// ==/UserScript==

function betterjtv_init()
{
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "http://2ndrun.tv/js/betterjtv.js?"+Math.random();
	thehead = document.getElementsByTagName('head')[0];
	if(thehead) thehead.appendChild(script);
}

betterjtv_init();
