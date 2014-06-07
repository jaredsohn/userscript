// ==UserScript==
// @name		TwitPic Background Enabler
// @namespace	http://meltingice.net
// @description	Use custom Twitter backgrounds on TwitPic instead of the default background
// @version		1.0
// @creator		Ryan LeFevre - MeltingIce
// @include		http://www.twitpic.com/photos/*
// @include		http://twitpic.com/photos/*
// ==/UserScript==

(function() {
	
	var css_ele = document.getElementById('content').getElementsByTagName('style')[0];
	css_ele.innerHTML = css_ele.innerHTML.replace(/\/\*(.*)\*\//, "$1");
	
})();