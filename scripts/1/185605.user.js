// ==UserScript==
// @name        imdb link pro filmow
// @namespace   mezb
// @description insere link do imdb no titulo do filme no filmow
// @include     http://filmow.com/*-t*
// @version     1
// @updateURL   http://userscripts.org/scripts/source/185605.user.js
// @grant       none
// ==/UserScript==

try {
	
		var title = document.getElementsByClassName("movie-original-title")[0];
		
		//cria nova tag h2
		var h2Tag = document.createElement('h2');
		h2Tag.className = "movie-original-title";
		
		//cria hyperlink
		var a = document.createElement('a');
		a.setAttribute("target", "_blank");
		a.setAttribute("href", "http://www.imdb.com/find?q=" + title.innerHTML.replace(/ /g,"+"));
		
		//joga titulo da tag h2 como texto do hyperlink
		a.appendChild(h2Tag);
		h2Tag.appendChild(document.createTextNode(title.innerHTML));
		
		
		//insere link na div de titulo e remove antigo
		var div = document.getElementsByClassName("movie-other-titles-wrapper")[0];
		div.insertBefore(a,div.firstChild);
		title.remove();

} catch (e) {
	
}
