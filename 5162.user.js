// ==UserScript==
// @name                Repubblica.it ad remover
// @namespace           http://www.qbicweb.net
// @description         Removes ads from Repubblica.it
// @include             http://*repubblica.it*
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
	
	var cssStyle = '#topheader, #header-banner, #advstrip img, #utility dl, #vetrineup, #vetrinedown, #shoppingall, #annunci, #conoscersi, #ad-strips, .shared-content-vetrina, #ovadsense, .dir-adtags, .adv-a, .ad-box, #siderbar-banner, .adv, #contenitorecentro #sbcolleft, #FinContentTop1 #adv180x150r, #adv160x600r, #adv180x150m, #adv300x250, #adv160x75rdown, #adv180x150r, #adv160x75rup, #shoppingday {display:none !important;} #contenitorecentro #colonnanotizie {width:510px !important;} #multimedia {min-width:500px !important; margin:0 auto !important;}';

	addGlobalStyle(cssStyle);
	cerrarPubExplorer(ident);
	
})()