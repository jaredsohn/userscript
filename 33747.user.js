// ==UserScript==
// @name           CE recent redirector
// @description    Redirecciona mensajes recientes a la ultima pagina.
// @include        http://www.crisisenergetica.org/
// @include        http://www.crisisenergetica.org/index.php
// ==/UserScript==
document.addEventListener('click', 
	function(event) {
	     if (event.target.href.match(/showtopic/)) {
			str = event.target.parentNode.parentNode.lastChild.textContent;
			str = str.slice(str.lastIndexOf('s')+2);
			event.target.href = event.target.href.replace('&fromblock=yes','&mode=&show=40&page=')+Math.ceil(str/40);
		}		
}, true);