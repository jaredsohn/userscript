// ==UserScript==
// @name           hatena bloger title
// @namespace      http://ss-o.net/
// @include        http://d.hatena.ne.jp/*
// @include        http://*.g.hatena.ne.jp/*
// ==/UserScript==

(function() {
	var Hash = location.hash;
	var h3 = document.getElementsByTagName('h3');
	var hash_ed = false;
	for (var i = 0,L = h3.length; i < L; ++i) {
		var a = h3[i].getElementsByTagName('a')[0];
		if (a && /#p?\d+/.test(a.hash))
			hash_ed = true;
	}
	if (!hash_ed && !Hash && !/#p?\d+/.test(Hash))
		return;

	var baseTitle = document.title;
	hashTitle(Hash);
	var f = function() {
		if (Hash != location.hash) {
			hashTitle(location.hash);
			Hash = location.hash;
		}
		setTimeout(f,500);
	};
	f();

	function hashTitle(hash){
		var a, na = document.getElementsByName(hash.substring(1));
		if (na && (a = na[0]) && a.href) {
			var text = $X('descendant::text()[not(parent::span)]',a.parentNode).map(function(n){return n.nodeValue}).join('');
			document.title = text.replace(/^\s*(?:\[[^\]]+\])*(.*?)\s*$/,"$1") + ' - ' + baseTitle;
		}
	}
	// very simple version of $X
	// $X(exp);
	// $X(exp, context);
	// $X(exp, context, resolver);
	// @source http://gist.github.com/29681.txt
	function $X (exp, context, resolver) {
		context || (context = document);
		var Doc = context.ownerDocument || context;
		var result = Doc.evaluate(exp, context, resolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0, len = result.snapshotLength, res = []; i < len; i++) {
			res.push(result.snapshotItem(i));
		}
		return res;
	}
})();
