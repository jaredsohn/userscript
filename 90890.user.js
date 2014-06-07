// ==UserScript==
// @name        Vkontakte.ru remove adver
// @namespace   http://userscripts.org/scripts/show/90890
// @version     1.00
// @date        2010-11
// @include     http://vkontakte.ru/*
// @include     http://*.vkontakte.ru/*
// @include     http://vk.com/*
// @include     http://*.vk.com/*
// ==/UserScript==
(function(){
	if (navigator.userAgent.toLowerCase().indexOf("opera") != -1){
		document.addEventListener('load', function (e){
			if (e.element.text.indexOf('var BannerLoader') != -1 || e.element.baseURI.indexOf('http://vkontakte.ru/ads_rotate.php') != -1) e.element.text = '';
		}, false);
	}
	
	document.addEventListener('DOMContentLoaded', function (){
		var b1 = document.getElementById('banner1');
		if (b1) b1.parentNode.removeChild(b1);
		
		var b2 = document.getElementById('banner2'); 
		if (b2) b2.parentNode.removeChild(b2);
	}, false);
})();