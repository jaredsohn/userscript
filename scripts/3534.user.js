// Copyright (c) 2006, Perberos
// http://perberos.pe.funpic.de/

// ==UserScript==
// @name		  Kings of Chaos Ad Remover
// @namespace	 kingsofchaosadremover
// @description   Para el juego Kings of Chaos
// @include	   http://www.kingsofchaos.com/*
// @exclude	   
// ==/UserScript==    

//Quita todos los scritps de google-analytics
(function() {
	var jsc = document.getElementsByTagName('script');
	
		for (var i = jsc.length - 1; i >= 0; i--) {
			if (jsc[i].getAttribute('type') == "text/javascript"){
				jsc[i].innerHTML = "";
			}
		}
})();

//Quita el banner de la derecha
(function() {
	var tds = document.getElementsByTagName('td');
	for (var i = tds.length - 1; i >= 0; i--) {
		if(tds[i].getAttribute('style') == "padding-top: 11px;"){
			tds[i].parentNode.removeChild(tds[i]);
		}
	}
})();

//quita todos los iFrames
(function() {
	var trs = document.getElementsByTagName('iframe');
	for (var i = trs.length - 1; i >= 0; i--) {
		trs[i].parentNode.removeChild(trs[i]);
	}
})();

//mas publicidad...
(function() {
	if (self.document.URL.indexOf("armory.php") != -1) {
		var bannerframe = document.getElementsByTagName('center');
		bannerframe[1].parentNode.removeChild(bannerframe[1]);
	}
})();

//No script es Ads
(function() {
	var bannerframe = document.getElementsByTagName('noscript');
	for (var i = bannerframe.length - 1; i >= 0; i--) {
		bannerframe[i].parentNode.removeChild(bannerframe[i]);
	}
})();

//Quita (Advertise above)
(function() {
	var ps = document.getElementsByTagName('p');
		for (var i = ps.length - 1; i >= 0; i--) {
			code = ps[i].innerHTML;
			if(code.search(".extreme-dm.com") != -1){
				ps[i].parentNode.removeChild(ps[i]);
			};
			if(code.search("ww.adbrite.com") != -1){
				ps[i].parentNode.removeChild(ps[i]);
			};
			if(code.search("images.kingsofchaos.com/safer.gif") != -1){
				ps[i].parentNode.removeChild(ps[i]);
			};
		}
})();

//kingsofchaosadremover.user.js
