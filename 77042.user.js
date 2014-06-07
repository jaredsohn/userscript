// ==UserScript==
// @name           RandomProxy
// @namespace      http://stackoverflow.com/users/982924/rasg
// @author         RASG
// @version        2012.06.14
// @description    [PT] Carrega paginas e links atraves de um proxy aleatorio. [EN] Load webpages and links through a random proxy.
// @include        http*://*
// ==/UserScript==

var matriz =   ['https://cache-001.appspot.com/','https://cache-003.appspot.com/','https://cache-017.appspot.com/','https://meme-darwin.appspot.com/'];
var proxy =    matriz[Math.floor(Math.random() * matriz.length)];
var temproxy = 0;
var url =      window.location.href;

for (i in matriz) {
	if (url.indexOf(matriz[i]) > -1) {
		temproxy = 1;
	}
}
		
if (temproxy == 0) {
	window.location.replace(location.href.replace(location.protocol + '//', proxy));
	for (var i=0,link; (link=document.links[i]); i++) {
		if (link.href.indexOf(proxy) < 0) {
			link.href = link.href.replace(link.href.substring(0,7), proxy);
		}
	}
}