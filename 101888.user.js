// ==UserScript==
// @id             adf.ly-fucker
// @name           Adf.ly Fucker
// @namespace      red-sheep.de
// @description    Fucks adf.ly
// @include        http://adf.ly/*
// @include        http://u.bb/*
// @include        http://9.bb/*
// ==/UserScript==

(function(){
	for each (var script in document.getElementsByTagName("script")) {
		if (script.innerHTML) {
			var urlre = /var url = '([^']+)'/g;
			urlre = urlre.exec(script.innerHTML);
			if (urlre) {
				location.href=(urlre[1]);
				document.body.innerHTML = "<h1>Redirect to <a href='"+urlre[1]+"'>"+urlre[1]+"</a> nao!</h1>";
			}
		}
	}
})();