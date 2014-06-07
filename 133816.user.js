// ==UserScript==
// @author 		   Jerk_host
// @name           JerkTV
// @version 	   3.3
// @description    Brings the Fun back to Justin.tv Chat! Custom Chat colors.. Custom Animated Names and Tags! Tons Of Emoticons and much more!
// @namespace      http://www.jerkdevcom/
// @include        http://justin.tv/*
// @include        http://*.justin.tv/*
// @include        http://twitch.tv/*
// @include        http://*.twitch.tv/*
// ==/UserScript==

function jerkjtv_init()
{
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "https://jerkdev.com/jerktv1.js?"+Math.random();
	thehead = document.getElementsByTagName('head')[0];
	if(thehead) thehead.appendChild(script);
}

jerkjtv_init();