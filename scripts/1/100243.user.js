// ==UserScript==
// @name           Link Última Página
// @namespace      http://userscripts.org/scripts/show/100243
// @description    Adiciona um link para a última página do tópico em comunidades do Orkut.
// @author         Ravan (uid=15743442514574636747)
// @version        0.1
// @include        http*://*.orkut.*/CommTopics?cmm=*
// @include        http*://*.orkut.*/Community?cmm=*
// ==/UserScript==


/*
	Known-Bug: "Mostrando 1-10"

	Baseado no script 'Prévia do Tópico' do Fr4nk (uid=8057530411904348432)
	http://paste.pocoo.org/raw/354338/#.user.js
 */

Array.filter((this.orkutFrame || window).document.getElementsByTagName("a"),
	function(h) { 
			return /cmm=\d+&tid=\d+/(h)
	}).forEach(function(a) { 
			var l = document.createElement('a');
			l.innerHTML = "→";
			l.href = a.href + "&na=2";
			l.title = "Ir para a última página";
			a.parentNode.appendChild(l);
			return a;
	})