// ==UserScript==
// @name         Remove non-frame & non-img ads from index.hu
// @author         CruelAngel
// @namespace     http://cruelangelic.extra.hu
// @description   Remove non-frame & non-img ads from index.hu
// @include       http://*.index.hu/*
// @include       http://index.hu/*
// ==/UserScript==




function removeContent(id) {
	var node = document.getElementById(id);
	if (node) {
		node.parentNode.removeChild(node);
		node = null;
	}
}
function removeContentC(id) {
	var allElems = document.getElementsByTagName('*');
	for (var i = 0; i < allElems.length; i++) {
		var node = allElems[i];
		if (node.className && node.className == id) {
			node.parentNode.removeChild(node);
			node = null;
		}
	}
}
removeContent('booklinebox');
removeContent('ctravelbox');
removeContent('interware');
removeContent('allasbox');
removeContent('also_bannerek');
removeContent('cikk_bottom_adlink');
removeContent('box_tmobile');
removeContent('textads_rovat_bottom');

removeContentC('hirdetes');
removeContentC('hirdetes_bottom');
removeContentC('hirdetes prcikk');
removeContentC('hirdetes_disk');