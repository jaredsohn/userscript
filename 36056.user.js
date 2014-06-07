// ==UserScript==
// @name           MCL Thumbs
// @namespace      bravo/greasemonkey
// @version        1.0.0
// @description    Replace large images in posts to thumbnailed version
// @include        http://mycoffeelounge.net/forum-replies.php*
// @include        http://*.mycoffeelounge.net/forum-replies.php*
// ==/UserScript==

function $xu(p, c) {
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}
$xu('//IMG[contains(@src, "pixup")]').forEach(function(img) {
	if(parseInt(img.width) > 100 || parseInt(img.height) > 100) {
		var src = img.src.replace(/\/pixup\//i, '/pixup/tn/');
		img.src = src;
		img.removeAttribute('width');
		img.removeAttribute('height');
	}
});
