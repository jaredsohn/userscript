// ==UserScript==
// @name          meneame.net - desactivar estilos
// @description	  Desactiva los estilos de meneame.net para utilizar con Stylish: http://userstyles.org/styles/8909
// @author        posavasos
// @homepage      http://posavasos.googlepages.com/estilo-alternativo-meneame.html
// @include       http://meneame.net/*
// @include       https://meneame.net/*
// @include       http://www.meneame.net/*
// @include       https://www.meneame.net/*
// ==/UserScript==
(function() {
/* Desactiva  los estilos actuales http://www.alistapart.com/stories/alternate/ */
var i, a, main;
for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
	if(a.getAttribute("rel").indexOf("style") != -1) {
		a.disabled = true;
	}
}
})();