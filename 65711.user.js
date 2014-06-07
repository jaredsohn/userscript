// ==UserScript==
// @name           OponkaKiller
// @namespace      http://loudthinking.pl
// @description    Blip.pl backward redirect :-)
// @include        http://help.gadu-gadu.pl/*
// ==/UserScript==

if(document.location.href=='http://help.gadu-gadu.pl/errors/blip/'){

	var redir=setTimeout(function(){
	
		document.location.href='http://blip.pl/dashboard';
		
	},10000);
}