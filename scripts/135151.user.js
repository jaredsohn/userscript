// ==UserScript==
// @name           PixortNo403
// @namespace      http://semifo.pa.land.to/
// @description    Pixortでリンクを直接開いても403エラーが出なくなります（Chromeのみ）。
// @version        0.5.0
// @include        http://www.pixort.net/*
// ==/UserScript==

(function (d, func) {
	var h = d.getElementsByTagName('head')[0];
	var s1 = d.createElement('script');
	s1.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
	s1.addEventListener('load', function() {
		var s2 = d.createElement('script');
		s2.textContent = 'jQuery.noConflict();(' + func.toString() + ')(jQuery);';
		h.appendChild(s2);
	}, false);
	h.appendChild(s1);
})(document, function($) {
	// main 
	$('a').attr('rel','noreferrer');
});
