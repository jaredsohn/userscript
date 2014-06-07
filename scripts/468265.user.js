// ==UserScript==
// @name       Rune-Server Logo
// @namespace  logochanger
// @description  Replaces shitty logo with good one
// @includes *http://www.rune-server.org*
// ==/UserScript==

window.addEventListener('load', function() { 
	var images = document.getElementsByTagName('img'); 
	for (var i = 0; i < images.length; i++) { 
		images[i].src = images[i].src.replace('http://www.rune-server.org/images/bluefox/misc/logo.gif', 'http://i.imgur.com/Q7JQTPa.png');
	} 
}, false);