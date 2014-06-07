// ==UserScript==
// @name          Ugomemo Auto Reporter two of two
// @namespace     http://www.hatena.ne.jp/r-west/
// @description	  reports violation automatically.
// @include       http://ugomemo.hatena.ne.jp/*/movie.violation/*
// ==/UserScript==

(function () {
	var tdit = document.evaluate('//td',document,null,
			XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
	tdit.iterateNext();
	if (!tdit.iterateNext().textContent.match(/.*[1-9]+.*/)) {
		return;
	}

	var reason = document.evaluate('//input[@value="violence"]',
			document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if (!reason) {
		return;
	}
	reason.checked=true;
	document.evaluate('//form',document,null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.submit();
})();

