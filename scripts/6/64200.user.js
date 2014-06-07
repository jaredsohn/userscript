// ==UserScript==
// @name          hide-twitter-hatebu.user.js
// @namespace     http://www.kawaz.jp/userscripts/hide-twitter-hatebu
// @description   ツイッター経由はてぶを消す
// @include       http://b.hatena.ne.jp/entry/*
// ==/UserScript==
(function() {
	var nodes = $x('//li[span[@class="twitter"]]');
	for(var i = 0; i < nodes.length; i++) {
		nodes[i].style.display = 'none';
	}

	function $x(xpath, context) {
		var nodes = []; 
		try { 
			var doc = context || document; 
			var results = doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null); 
			var node; 
			while (node = results.iterateNext()) nodes.push(node); 
		} catch (e) {} 
		return nodes; 
	}
})();
