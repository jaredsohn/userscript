// ==UserScript==
// @name FrankerFaceZ
// @namespace	FrankerFaceZ
// @include	*.twitch.tv/*
// @exclude api.twitch.tv/*
// @grant none
// @icon http://frankerfacez.storage.googleapis.com/icon32.png
// @updateURL http://userscripts.org/scripts/source/167158.user.js
// @version 1.51
// ==/UserScript==

function ffz_init()
{
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "//commondatastorage.googleapis.com/frankerfacez%2Fscript%2Ffrankerfacez.js";
	var head = document.getElementsByTagName('head')[0];
	if(head) head.appendChild(script);
}

ffz_init();