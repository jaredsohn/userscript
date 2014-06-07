// ==UserScript==
// @name Orgas-mad - Eliminar Banners
// @namespace http://www.kk.com
// @description Greasemonkey script for Firefox to disable the banners of orgas
// @include *orgasmatrix.com*


// ==/UserScript==

(function(){ 
	function eliminarBannersOrgasmAd(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	var cssStyle = '.ad2, .col, .col2, iframe {display:none;}';
	
	eliminarBannersOrgasmAd(cssStyle);

})();