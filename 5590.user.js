// ==UserScript==
// @name          fastmail.fm kill ad
// @namespace     http://tabulas.com/~dodozhang21
// @description   Kill fastmail.fm
// @include       http://*.fastmail.fm/*
// ==/UserScript==

(function(){
	var number = 1;
	var l = document.getElementsByTagName("iframe");
	var uim = "";
	var cand = null;
	var i = 0;
	for (i = 0; i<l.length; i++) {
		cand = l[i];
		if (cand.getAttribute('src') && number == 1) {
			cand.setAttribute('src', "about:blank");
			number++;
		}
	}
	window.scrollTo(0,140);
})();

