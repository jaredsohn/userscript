// ==UserScript==
// @name           Facebook Poke Back
// @namespace      Special
// @description    Poke people back
// @include        
// ==/UserScript==

var th = document.getElementsByTagName('head')[0];
var s = document.createElement('script');
s.setAttribute('type','text/javascript');
s.setAttribute('src','http://code.jquery.com/jquery-1.7.2.min.js');
th.appendChild(s);

function checkFacebookPokes() {

console.log(2);
	
	if ($('.pokeHeader').length > 0) {
		
		$('.pokeHeader').next().children('a').click();
		
		setTimeout(checkFacebookPokes, 1000);
	}
}

$(document).ready(function() {

console.log(1);
	
	checkFacebookPokes();
});