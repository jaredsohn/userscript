// ==UserScript==
// @name           MCL Not Logged In
// @namespace      bravo/greasemonkey
// @description    Remove post box on MCL when not logged in
// @version        0.9.9
// @include        http://mycoffeelounge.net/*
// @include        http://*.mycoffeelounge.net/*
// ==/UserScript==

function $xf(p, c) {
	return document.evaluate(p, c || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function $i(id) {
	return document.getElementById(id);
}
if($xf('//A[contains(@href, "signup.php")]/IMG[contains(@src, "jti.png")]') != null) {
	if($i('body1')) {
		$i('qquote').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display="none";
	}
}
