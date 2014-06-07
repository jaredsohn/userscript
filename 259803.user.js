// ==UserScript==
// @name          [FNWH] : Hide noisy facebook stuff | اخفاء ملحقات فيسبوك المزعجة
// @description	  يخفي العمود الخاص بالاعلانات والاقتراحات 
// @namespace     http://www.abdulmogeeb.me
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// By Abdulmogeeb Mohammed, TNWH script : http://userscripts.org/scripts/show/186984
// ==/UserScript==

(function() {

	var kil = document.createElement('style'); 
	kil.appendChild(document.createTextNode('#rightCol {display:none !important;}'));
	kil.appendChild(document.createTextNode('#pagelet_ticker {display:none !important;}'));
	document.body.insertBefore(kil, document.body.firstChild); 

})();