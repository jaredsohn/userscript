// ==UserScript==
// @name           TFP Forum Ads Remover
// @description    Removes ads from TFP Forum
// @include        http://www.tfpforum.it/*
// ==/UserScript==

var ads = document.getElementById('ads');
if(ads) {
	ads.parentNode.removeChild(ads);
}

var body = document.getElementsByTagName('body');
if(body) {
	var h2s = body[0].getElementsByTagName('h2'); 
	var br;
	for(var i = 0; i < 4; i++) {
		br = h2s[4].nextElementSibling;
		br.parentNode.removeChild(br);
	}
}
