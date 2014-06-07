// ==UserScript==
// @name 高登無面
// @namespace http://www.ragnarrok.org/hkgnoface
// @description Remove Facebook like functionality on HKG
// @include http://forum*.hkgolden.com/*
// ==/UserScript==
var iframes = document.getElementsByTagName('IFRAME');
for (var i = 0; i < iframes.length; i++) {
	if(iframes[i].src.indexOf('like.php') > -1)
		iframes[i].style.display = 'none';
}