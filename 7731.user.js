// ==UserScript==
// @name          Twitter Display Name Mod
// @namespace     http://neo-geek.net/
// @description   Switches the username with the display name on Twitter.com.
// @include       http://twitter.com/*
// ==/UserScript==
	
var divs = document.getElementsByTagName('div');

for (var i = 0; i < divs.length; i++) {

	if (divs[i].className == 'tab') {
		
		var strong = divs[i].getElementsByTagName('strong');
		
		for (var j = 0; j < strong.length; j++) {
			
			var displayname = strong[j].getElementsByTagName('a')[0].title;
			var username = strong[j].getElementsByTagName('a')[0].innerHTML;
			
			strong[j].getElementsByTagName('a')[0].innerHTML = displayname;
			strong[j].getElementsByTagName('a')[0].title = username;
			
		}
		
	}
	
}