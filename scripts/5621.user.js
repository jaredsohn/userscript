// ==UserScript==
// @name ToxicoPC - Eliminar Banners
// @namespace http://www.veintecerodos.com.ar
// @description Greasemonkey script for Firefox to disable the banners of ToxicoPC
// @include *toxico-pc.com*
// @include *toxicopc.com*


// ==/UserScript==

(function(){ 
	function eliminarBannersToxicoPC(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	var cssStyle = '.bannerfull, .bannertoxico, .bannerlc, object {display:none;}';
	
	eliminarBannersToxicoPC(cssStyle);

})();