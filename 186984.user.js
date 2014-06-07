// ==UserScript==
// @name          Twitter noisy widgets hider | اخفاء ملحقات تويتر المزعجة
// @description	  this hides everything on twitter widgets except controls and time line. هذه الاضافة تخفي كل شيء في تويتر ماعدا التغريدات وعناصر التحكم
// @namespace     http://www.abdulmogeeb.me
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// By Abdulmogeeb Mohammed, based on  Jason Rhyley work
// ==/UserScript==

(function() {

	var kil = document.createElement('style'); 
	kil.appendChild(document.createTextNode('.wtf-module {display:none !important;}'));
	kil.appendChild(document.createTextNode('.Footer {display:none !important;}'));
	kil.appendChild(document.createTextNode('.trends {display:none !important;}'));
	kil.appendChild(document.createTextNode('.is-visible {display:none !important;}'));
	document.body.insertBefore(kil, document.body.firstChild); 

})();