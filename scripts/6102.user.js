// ==UserScript==
// @name La Razon - Eliminar MasOportunidades
// @namespace http://www.veintecerodos.com.ar
// @description Greasemonkey script for Firefox to change the appearance of LaRazon.com.ar
// @include *larazon.com.ar*


// ==/UserScript==

(function(){ 
	function eliminarPublicidadMasOportunidades(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	var cssStyle = '#colC, {display:none;}';
	
	eliminarPublicidadMasOportunidades(cssStyle);

})();