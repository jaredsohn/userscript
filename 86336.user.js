// ==UserScript==
// @name           RPGShop Large Images
// @namespace      http://freecog.net/2010/
// @description    Replaces the thumbnail on product pages with the full-size version.
// @include        http://www.rpgshop.com/*
// ==/UserScript==

Array.forEach(document.getElementsByTagName("img"), function(img) {
	if (img.id && img.id.match(/^det_img_\d+$/) && img.parentNode.href.match(/\.jpg$/)) {
		img.src = img.parentNode.href;
		img.removeAttribute('width');
		img.removeAttribute('height');
	}
});
