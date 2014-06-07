// ==UserScript==
// @name                Repubblica.it gossip remover
// @namespace           http://www.repubblica.it
// @description         Remove rightbar from Repubblica.it
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
	
	var cssStyle = '#contenitorespalla, iframe#mirago-iframe, #shoppingall, #annunci, .conoscersi, .mobile, .bottom-mobile {display:none !important} #aperturahp, #riaperturahp, #riapertura2hp{width:auto;}	'
	cssStyle += '#container #contenitorecentro #colonnanotizie{ width: 640px} '
	cssStyle += '#container .txt12 {font-size:17px; line-height:22px; line-height:normal;}';
	cssStyle += '#container .txt16 {font-size:22px; line-height:23px; line-height:normal;}';
	cssStyle += '#container .txt18 {font-size:28px; line-height:23px; line-height:normal;}';
	cssStyle += '#container .txt21, #breakingnews .txt21 {font-size:27px; line-height:normal;}';


	addGlobalStyle(cssStyle);
	cerrarPubExplorer(ident);
	
})()
