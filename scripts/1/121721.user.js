// ==UserScript==
// @name          Oculta firmas Comunio
// @namespace     http://twitter.com/migueit
// @include       *.comunio.es/external/phpBB2/*
// @description	  Oculta las firmas del foro de Comunio
// @exclude
// ==/UserScript==

(function() {
	var posts = document.getElementsByClassName("forum_overflow");
	for (i = 0; i < posts.length; i++) {
		str = posts[i].innerHTML;
		indice = str.indexOf('_________________');
		sub = str.substr(0, indice);
		if(indice != -1)
			posts[i].innerHTML = sub;
	}
})();