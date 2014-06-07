// ==UserScript==
// @name        Hatena Sort Entries
// @namespace   http://lowreal.net/
// @include     http://d.hatena.ne.jp/*/*
// @include     http://*.g.hatena.ne.jp/*/*
// @license     CC by
// ==/UserScript==



(function () {
	$X("//div[@class='day']/div[@class='body']").forEach(function (b) {
		var sections = $X(".//div[@class='section']", b);
		sections.map(function (e) {
			var a = $X("./h3/a", e)[0];
			return [e, a ? Number(a.href.match(/\d+$/)) : 0];
		}).sort(function (a, b) {
			return a[1] - b[1];
		}).forEach(function (e) {
			b.appendChild(e[0]);
		});
	});

	function log () {
		var c = unsafeWindow.console;
		if (c) c.log.apply(c, arguments);
	}

	function $N(name, attr, childs) {
		var ret = document.createElement(name);
		for (k in attr) {
			if (!attr.hasOwnProperty(k)) continue;
			v = attr[k];
			if (k == "class") {
				ret.className = v;
			} else {
				ret.setAttribute(k, v);
			}
		}
		switch (typeof childs) {
			case "string": {
				ret.appendChild(document.createTextNode(childs));
				break;
			}
			case "object": {
				for (var i = 0, len = childs.length; i < len; i++) {
					var child = childs[i];
					if (typeof child == "string") {
						ret.appendChild(document.createTextNode(child));
					} else {
						ret.appendChild(child);
					}
				}
				break;
			}
		}
		return ret;
	}

	function $X(exp, context) {
		if (!context) context = document;
		var resolver = function (prefix) {
			var o = document.createNSResolver(context)(prefix);
			return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
		}
		var exp = document.createExpression(exp, resolver);

		var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
		switch (result.resultType) {
			case XPathResult.STRING_TYPE : return result.stringValue;
			case XPathResult.NUMBER_TYPE : return result.numberValue;
			case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
			case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
				result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var ret = [];
				for (var i = 0, len = result.snapshotLength; i < len ; i++) {
					ret.push(result.snapshotItem(i));
				}
				return ret;
			}
		}
		return null;
	}

})();
