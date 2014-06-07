// ==UserScript==
// @name        Tumblr - Remove Analytics like ScoreCardResearch
// @namespace   remove-ga-quant-scr
// @include     http://www.tumblr.com/*
// @version     1
// ==/UserScript==
var js = document.getElementsByTagName("script");
for(var i=0; i<js.length; i++){
	if((js[i].getAttribute('src')+'').match(/(assets\.tumblr\.com)/i)==null && js[i].getAttribute('src')!=null){
		js[i].parentNode.removeChild(js[i]);
		i--;
	}
}
var ifr = document.getElementsByTagName("iframe");
for(var i=0; i<ifr.length; i++){
	if((ifr[i].getAttribute('src')+'').match(/analytic/i)!=null){
		ifr[i].parentNode.removeChild(ifr[i]);
		i--;
	}
}
var ns = document.getElementsByTagName("noscript");
for(var i=0; i<ns.length; i++){
	ns[i].parentNode.removeChild(ns[i]);
	i--;
}