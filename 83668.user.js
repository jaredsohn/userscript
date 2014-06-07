// ==UserScript==
// @name           Gray_Ur_Sister
// @namespace      http://vvtommy.com/douban_gray_disable
// @description    by 小刺@douban
// @version        1.1
// @author         vvtommy
// @include        http://*.douban.com/*
// ==/UserScript==
(function(window){
	for(i in window.document.styleSheets){
		window.document.styleSheets[i].href && window.document.styleSheets[i].href.match(/.*gray.*/) && (window.document.styleSheets[i].disabled=true);
	}
})(window);