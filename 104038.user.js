// ==UserScript==
// @name           Sticky Steam
// @namespace      sticky.steam.console.cc
// @description    Stay logged in forever at Steam and make the age verification remember you
// @include        http://store.steampowered.com/*
// @include        https://store.steampowered.com/*
// @include        http://steamcommunity.com/*
// @include        https://steamcommunity.com/*
// ==/UserScript==

var exdate = new Date();
exdate.setDate(exdate.getDate() + 365);

var allCookies = document.cookie.split ('; ');
for (var i=0;i<allCookies.length;i++)
{
	var cookiesPair = allCookies[i].split('=');
	if (cookiesPair[0] == 'steamLogin' || cookiesPair[0] == 'birthtime')
	{
		document.cookie = cookiesPair[0] + '=' + cookiesPair[1] + '; expires=' + exdate.toUTCString() + '; path=/';
	}
}
