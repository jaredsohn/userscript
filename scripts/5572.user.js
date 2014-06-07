// ==UserScript==
// @name		Ole - Eliminar MasOportunidades
// @namespace	http://www.veintecerodos.com.ar
// @description	Greasemonkey script for Firefox to change the appearance of Ole.Clarin.com
// @include        *ole.clarin.com*

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
	
	var cssStyle = '#cn4 {display:none;}';
	
	eliminarPublicidadMasOportunidades(cssStyle);

})();
