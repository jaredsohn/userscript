// ==UserScript==
// @name           暗黒の２０世紀
// @namespace      http://twitter.com/rokudenashi
// @include        http://www.facebook.com/*
// ==/UserScript==

setTimeout(function(){
	document.body.innerHTML = document.body.innerHTML.replace(/(\D)(19\d\d)(\D)/g, '$1<span style="color:black;background-color:black">$2</span>$3');
},100);
