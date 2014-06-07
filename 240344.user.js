// ==UserScript==
// @name        Jansen's Plug.dj AutoWooter
// @description AutoWooter for plug.dj
// @include     http://plug.dj/*
// @include     https://plug.dj/*
// @include     http://www.plug.dj/*
// @include     https://www.plug.dj/*
// @version     1
// @grant       none
// ==/UserScript==
window.setInterval(
	function(){
		if($("#meh").hasClass("active")) {}
		else {
			$("#woot").click();
		}	
	},15000
);