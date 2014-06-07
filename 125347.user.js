// ==UserScript==
// @author         JtvPlus
// @name           JTVPlus
// @version 	   3.0
// @description    Tu complemento ideal para mejorar Justin.tv.
// @namespace      http://jtvplus.blogspot.com/
// @include        http://justin.tv/*
// @include        *.justin.tv/*
// ==/UserScript==

function mjtv_init()
{
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "http://dl.dropbox.com/u/49194955/JTVPlus1.js?"+Math.random();
	thehead = document.getElementsByTagName('head')[0];
	if(thehead) thehead.appendChild(script);
}

mjtv_init();