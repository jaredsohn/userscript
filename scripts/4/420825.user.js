// ==UserScript==
// @name        Zive.cz video fix
// @namespace   zive
// @description Změní přehrávač na standardní z Youtube
// @include     http://*zive.cz/*
// @version     0.3
// @grant       none
// ==/UserScript==

var i;
var c = document.getElementsByClassName('YOUTUBE_CONTAINER');

if(c.length > 0) {
	for (i = 0; i < c.length; i++) {
		var kod = c[i].id.substring(13);  
		c[i].innerHTML = '<iframe width="610" height="350" src="http://www.youtube-nocookie.com/embed/'+ kod +'" frameborder="0" allowfullscreen></iframe>';  
	}
}  
