// ==UserScript==
// @name           hachima_and_zin_filter
// @namespace      raa0121
// @description    hachima_and_zin_filter
// @include        http://jin115.com/*
// @include        http://blog.esuteru.com/*
// ==/UserScript==

(function() {
	var bodys = document.getElementsByTagName("body");
	for(var i=0;i < bodys.length;i++){
		var body = bodys[i];
		body.parentNode.removeChild(body);
	}
	document.title="はちまor刃を検出しました";
})();
