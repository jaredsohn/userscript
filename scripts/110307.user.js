// ==UserScript==
// @name Google Plus Icon Replacer
// @version 0.2
// @description Google+でアイコンを48pxではなく128pxにするスクリプト
// @include http://plus.google.com/*
// @include https://plus.google.com/*
// ==/UserScript==

setInterval(function(){
	var elements = document.querySelectorAll("img[src*='/s48-']"), i, e;
	for (i = 0; i < elements.length; ++i){
		e = elements[i];
		e.src = e.src.replace(/\/s48-/g, '/s128-');
	}
}, 1000);