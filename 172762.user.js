// ==UserScript==
// @name        GeoTTV
// @namespace   http://twitchapp.com/geottv
// @include     http://*.twitch.tv/*
// @include     https://*.twitch.tv/*
// @include     http://twitch.tv/*
// @include     https://twitch.tv/*
// ==/UserScript==
function twitch_init()
{
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "//twitchapps.com/geottv/remotescript.js?"+Math.random();
	thehead = document.getElementsByTagName('head')[0];
	if(thehead) thehead.appendChild(script);
}

twitch_init();