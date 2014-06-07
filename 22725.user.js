// ==UserScript==
// @name FiyatTakip.com
// @namespace http://www.userscripts.org
// @description Direk Urun Sayfasina Baglanti
// @include *FiyatTakip.com*
// ==/UserScript==
// version 20080212
// karanliklar@gmail.com

(function (){
	var pageLinks = document.getElementsByTagName("a");
	for (var i=0; i<pageLinks.length; i++){
		if (pageLinks[i].href.match(/product/)){
			pageLinks[i].href = pageLinks[i].href.replace('/product/', '/link/');
		}
	}	
})();