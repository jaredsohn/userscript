// ==UserScript==
// @name        Orkut sem Propaganda do Chrome
// @description Remove a propaganda do Chrome que aparece no Orkut.
// @include     http://www.orkut.com/*
// @include     http://www.orkut.com.br/*
// ==/UserScript==

(function() {
	var divs = document.getElementsByTagName("div");
	for (var i = 0, l = divs.length; i < l; i++) {
		if (divs[i].className == "listlight promobg") {
			for (var j = 0, m = divs[i].childNodes.length; j < m; j++) {
				if (divs[i].childNodes[j].className == "lf icnchrome") {
					divs[i].style.display = "none";
					break;
				}
			}
		}
	}
})();
