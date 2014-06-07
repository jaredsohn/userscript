// ==UserScript==
// @name           Google Saeuberung
// @description    Deports unwanted elements from links. (C) Bernd, BSDL.
// @namespace      asdf1488
// @include        *://*google.*/*
// @version        0.1
// ==/UserScript==
(function(){
	function saeuberung(links) {
		for( var i=0; i<links.length; ++i ){
      links[i].href = links[i].href.replace(/https?:\/\/w*\.?google\..*\/url\?q=/,"");
      links[i].href = links[i].href.replace(/\&sa\=U\&ei\=.*/,"");
		}
	};
  saeuberung(document.getElementsByTagName('a'));
})();
