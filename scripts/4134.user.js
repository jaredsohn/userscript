// ==UserScript==
// @name          RADEN Preview Maps
// @namespace     http://userscipts.org
// @description   Adds a preview to the maps that you can download on RADEN
// @include      http://www.cncgames.com/*
// @include      http://*.cncgames.com/*
// ==/UserScript==

var links = document.getElementsByTagName('a');
var rE = /^map_pics[0-9].*/;

	for (var i = 0; i < links.length; i++) {
	
	if(rE.exec(links[i].getAttribute('href'))) { 
		var imgLocation = links[i].href + '';
		links[i].innerHTML = '<img src=\'' + imgLocation + '\' width=300px>';
	}
	
}
alert(links[i].getAttribute('href'));