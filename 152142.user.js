// ==UserScript==
// @name           MCL Fix quote links
// @namespace      bravo/greasemonkey
// @description    Unfuck MCL quote links
// @include        http://mycoffeelounge.net/*
// @include        http://*.mycoffeelounge.net/*
// @version        1.0
// ==/UserScript==
function $xu(p, c) {
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}
$xu('//A[contains(@href,"cl-replies.php")]').forEach(function(lnk) {
	lnk.href=lnk.href.replace(/cl-replies.php/,'forum-replies.php');
});
