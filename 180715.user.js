// ==UserScript==
// @name AutoRun mubBot
// @description Autoruns mubbot
// @author DerpTheBass
// @include http://plug.dj/*
// @include http://pepper.plug.dj/*
// ==/UserScript==

$(function(){
load = function(){
	if (typeof API !== 'undefined' && typeof Slug === 'undefined') $.getScript('https://raw.github.com/Emub/plugDJExtensions/master/mubBotUser.js');
	else setTimeout(function(){load()}, 500);
}

load();
});