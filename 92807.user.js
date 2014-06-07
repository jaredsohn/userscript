// ==UserScript==
// @name           Mafia Wars no-frame
// @description    go to no-frame version of Mafia Wars.
// @author         Sigi_cz
// @version        1.01
// @include        http://apps.facebook.com/inthemafia/*
// @exclude        http://facebook.mafiawars.com/mwfb/*
// ==/UserScript==

(function () {
if (document.getElementsByName('mafiawars')[0]) {
	window.location.href=document.getElementsByName('mafiawars')[0].src;
}
}())