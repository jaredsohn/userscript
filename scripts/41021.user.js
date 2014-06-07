// ==UserScript==
// @name          Ugomemo Auto Reporter one of two
// @namespace     http://www.hatena.ne.jp/r-west/
// @description	  reports violation automatically.
// @include       http://ugomemo.hatena.ne.jp/movies*
// ==/UserScript==

(function () {
	var memoit = document.evaluate('//a[@class="thumb-container"]',
			document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
	var iframes = [];
	var memo = memoit.iterateNext();
	while (memo) {
		var iframe = document.createElement("iframe");
		iframe.setAttribute('src','http://ugomemo.hatena.ne.jp'
			+document.evaluate('@href',memo,null,XPathResult.STRING_TYPE,null).stringValue
				.replace(/([^\/]+)\/movie\/([^?]+).*/, '$1/movie.violation/$2'));
		iframe.setAttribute('width','0%');
		iframe.setAttribute('height','0%');
		iframes.push(iframe);
		memo = memoit.iterateNext();
	}

	var body = document.evaluate('/html/body',document,null,
				XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	for (var i in iframes) {
		body.appendChild(iframes[i]);
	}
	setTimeout(function() {window.location.reload();}, 1200000);
})();

