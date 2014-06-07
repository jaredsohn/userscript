// ==UserScript==
// @name          0Tumblr Fix Pagination
// @description   Fixes Prev/Next links in Tumblr except for Dashboard page.
// @namespace     http://codefairy.org/ns/userscripts
// @include       http://www.tumblr.com/*
// @version       0.1.1
// @license       MIT License
// @work          Greasemonkey
// @work          GreaseKit
// @work          Google Chrome
// ==/UserScript==

new function() {
	if (
		$X('id("nav")').length &&
		(/^(?:\/tumblelog\/[-\w]+)?\/show\/\w+/.test(location.pathname))
	) {
		fix_pagination(document, location.href);
		setTimeout(function() {
			if (window.AutoPagerize && window.AutoPagerize.addDocumentFilter)
				window.AutoPagerize.addDocumentFilter(fix_pagination);
		});
	}

	// http://userscripts.org/scripts/show/40794
	function fix_pagination(doc, url) {
		var m = /www\.tumblr\.com(.*?)(?:\/(\d+))?\/?(?:\?|$)/.exec(url);
		var base = m[1];
		var page = +m[2] || 1;
		var prev = base+'/'+(page - 1);
		var id = /\d+/.exec($X('.//li[starts-with(@id, "post")][last()]', doc)[0].id)[0];
		var next = base+'/'+(page + 1)+'?offset='+id;
		var controls = $X('id("dashboard_controls")//a', doc);
		if (controls.length) {
			controls[0].href = base;
			controls[1].href = prev;
			if (controls[2]) controls[2].href = next;
		}
		var pagination = $X('id("pagination")/a', doc);
		pagination[0].href = (page > 1) ? prev : next;
		if (pagination[1])
			pagination[1].href = next;
	}

	// http://gist.github.com/3242
	function $X (exp, context) {
		context || (context = document);
		var expr = (context.ownerDocument || context).createExpression(exp, function (prefix) {
			return document.createNSResolver(context.documentElement || context).lookupNamespaceURI(prefix) ||
				context.namespaceURI || document.documentElement.namespaceURI || "";
		});

		var result = expr.evaluate(context, XPathResult.ANY_TYPE, null);
			switch (result.resultType) {
				case XPathResult.STRING_TYPE : return result.stringValue;
				case XPathResult.NUMBER_TYPE : return result.numberValue;
				case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
				case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
					// not ensure the order.
					var ret = [], i = null;
					while (i = result.iterateNext()) ret.push(i);
					return ret;
			}
		return null;
	}
};
