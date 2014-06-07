// ==UserScript==
// @name           Esconder firmas
// @revision       1
// @author         Argaen
// @description    Esconde las firmas de los posts.
// @namespace      http://userscripts.org/users/214754
// @include        http://www.cai.cl/foro_old/*
// ==/UserScript==

void(function() {
	var els = document.getElementsByTagName('div');
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)signature(\\s|$)");
	for(i=0; i<elsLen; ++i)
		if(pattern.test(els[i].className))
			els[i].style.display='none';
})();
