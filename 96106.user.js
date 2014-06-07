// ==UserScript==
// @name Orgas-video - Solo muestra el video
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
	
	var cssStyle = '.header, .header_ad, .sidebar, .footer, .banner, .comments_box, .respond {display:none;}';
	
	eliminarBannersOrgasmAd(cssStyle);

})();