// ==UserScript==
// @name        Esconder estrellas
// @namespace   http://userscripts.org/users/214754
// @description Esconder estrellas de las estadísticas de un quiz.
// @include     http://inguandes.cl/cursos/quiz/stats/*
// @version     1
// @author      Argaen
// @grant       none
// ==/UserScript==

void(function() {
	var els = document.getElementsByTagName('i');
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)icon-star(\\s|$)");
	for(i=0; i<elsLen; ++i)
		if(pattern.test(els[i].className))
			els[i].style.display='none';
	var pattern = new RegExp("(^|\\s)icon-star-empty(\\s|$)");
	for(i=0; i<elsLen; ++i)
		if(pattern.test(els[i].className))
			els[i].style.display='none';
})();