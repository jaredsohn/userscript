// ==UserScript==
// @author 		   BetterJTV Dev
// @name           EpicJTV
// @version 	   0.4 Alpha
// @description    Enhances the Justin.TV watching experience.
// @namespace      http://apis.zzaaa.cc/epicjtv/
// @include        http://justin.tv/*
// @include        http://*.justin.tv/*
// @include        http://twitch.tv/*
// @include        http://*.twitch.tv/*
// ==/UserScript==

function epicjtv_init()
{
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "http://apis.zzaaa.cc/epicjtv/epicjtv.js?"+Math.random();
	thehead = document.getElementsByTagName('head')[0];
	if(thehead) thehead.appendChild(script);
}

epicjtv_init();