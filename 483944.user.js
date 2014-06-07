// ==UserScript==
// @name Hitbox Emotes
// @namespace Hitbox Emotes
// @description Allows the use of Twitch emotes on Hitbox.
// @include	*.hitbox.tv/*
// @include	*.speedrun.tv/*
// @include	*.twitch.tv/*
// @icon http://i.imgur.com/fa1Kkku.png
// @version 1.1.8
// @updateURL https://gist.githubusercontent.com/GamingTom/11141717/raw/465792.user.js
// @downloadURL https://gist.githubusercontent.com/GamingTom/11141717/raw/465792.user.js
// ==/UserScript==

function hitbox_init()
{
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "https://gist.githubusercontent.com/GamingTom/11142192/raw/emotes.js";
	var head = document.getElementsByTagName('head')[0];
	if(head) head.appendChild(script);
}

hitbox_init();