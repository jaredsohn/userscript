// ==UserScript==
// @name           Facebook Sidebar Remover
// @author         Hubert Orlik-Grzesik
// @description    Gets rid of the new facebook sidebar
// @include        http://*.facebook.com/*
// ==/UserScript==

(function(){
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.ticker_stream {display: none;}';
	document.getElementsByTagName('head')[0].appendChild(style);
})();