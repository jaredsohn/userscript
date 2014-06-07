// ==UserScript==
// @name          appenginenowjp-skip
// @namespace     http://userscripts.org/users/kawaz
// @description   appengine-now.jpをスキップして元記事に飛ぶ
// @include       http://appengine-now.jp/*
// ==/UserScript==
(function(){
	xmap('//a[@rel="nofollow"]', document, function(t){
		location.replace(t.href);
	})

	function xmap(exp, node, func) {
		if(typeof func != 'function') {
			return;
		}
		var x = document.evaluate(exp, node, null, XPathResult.ANY_TYPE, null);
		var tt = [];
		for(var t = x.iterateNext(); t; t = x.iterateNext()) {
			tt.push(t);
		}
		for(var i = 0; i < tt.length; i++) {
			func(tt[i]);
		}
	}
})();
