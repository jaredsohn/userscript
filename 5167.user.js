// ==UserScript==
// @name                Ansa.it ad remover
// @namespace           http://www.qbicweb.net
// @description         Removes ads from Ansa.it
// @include             http://*ansa.it*
// ==/UserScript==

(function(){ 
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	var cssStyle = '.adv_728, .adv_240, .adv_120, .box_adv_ext {display:none;} .td_iso img {visibility:hidden;}';

	addGlobalStyle(cssStyle);
	cerrarPubExplorer(ident);
	
})()