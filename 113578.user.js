// ==UserScript==
// @name		Facebook- No Livefeed
// @author		Rodger Benham
// @namespace	http://www.donthaveaurl.com/
// @version		1.0
// @description	Removes live feed on Facebook.
// @include		http://*.facebook.com/*
// @include		https://*.facebook.com/*
// ==/UserScript==

function noTicker() {
	var ticker = document.getElementById('pagelet_ticker');
		
	if(ticker != null) {
		ticker.style.display = "none";
		ticker.style.height = "0%";
	}
	
	var fbChat = document.getElementById('u756812_103');
	
	if(fbChat != null) {
		fbChat.style.height = "100%";
	}
}

var noTickerId = setInterval(noTicker, 100);