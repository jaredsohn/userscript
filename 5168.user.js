// ==UserScript==
// @name                Corriere.it ad remover
// @namespace           http://www.qbicweb.net
// @description         Removes ads from Corriere.it
// @include             http://*corriere.it*
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
	
	var cssStyle = 'body {max-width:800px !important;} #leaderboard, #Flotante, #pushbar, #boxadv2, #boxadv, .adv, #mainleft table, #mainleft center {display:none !important;}#speciali .right{display:none;}#speciali .left{width:480px !important;} #speciali .left .altrispeciali img {float:right !important; margin:0 !important;}#mainright img {display:none !important;} #mainright table img, #mainright #fotogiorno img {display:inline !important;}#correlati {display:none !important;} #articolo {width:765px !important;}, #articolo script {display:none !important;}, #articolo table {background:#fff !important;}';
	
	addGlobalStyle(cssStyle);
	cerrarPubExplorer(ident);
	
})()