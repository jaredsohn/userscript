// ==UserScript==
// @author         Mejorarjtv
// @name           MejorarJTV
// @version 	   1.0
// @description    Tu complemento ideal para mejorar Justin.tv. Versión mejorada de BetterJTV.
// @namespace      http://mejorarjtv.drupalgardens.com/
// @include        http://justin.tv/*
// @include        *.justin.tv/*
// ==/UserScript==

function mjtv_init()
{
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "http://dl.dropbox.com/u/46266771/MejorarJTV.js?"+Math.random();
	thehead = document.getElementsByTagName('head')[0];
	if(thehead) thehead.appendChild(script);
}

mjtv_init();