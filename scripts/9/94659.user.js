// ==UserScript==
// @name          friendfeedcom-skip
// @namespace     http://userscripts.org/users/kawaz
// @description   friendfeed.comをスキップして元記事に飛ぶ
// @include       http://friendfeed.com/*
// ==/UserScript==
(function(){
	xmap('//a[@rel="nofollow"][@href=@title]', document, function(t){
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