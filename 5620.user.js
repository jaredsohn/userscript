// ==UserScript==
// @name MaximoPC - Eliminar Banners
// @namespace http://www.veintecerodos.com.ar
// @description Greasemonkey script for Firefox to disable the banners of MaximoPC.org
// @include *maximopc.org*


// ==/UserScript==

(function(){ 
	function eliminarBannersMaximoPC(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	var cssStyle = '.header_banner, .content_banner, #content_banner_v, .footer_banner, object, .gris {display:none;}';
	
	eliminarBannersMaximoPC(cssStyle);

})();