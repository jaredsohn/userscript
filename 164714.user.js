// ==UserScript==
// @name           Grepolis Report Converter
// @include        http://*.grepolis.com/game*
// @exclude        view-source://*
// @version        2.1.0
// ==/UserScript==
void(function(){
	var t=document.createElement('script');
	t.type='text/javascript';
	t.innerHTML = 	"   var t=document.createElement('script');\n" +
			"   t.type='text/javascript';\n" +
			"   t.src='http://pbg.ucoz.es/grc_mas_emots.js?_'+(new Date()).getTime();\n" +
			"   document.body.appendChild(t);\n";
	document.body.appendChild(t);
})();
//Copyright (C) Potusek - All rights reserved for Potusek (I am not him, just edited this to add more emots ingame).