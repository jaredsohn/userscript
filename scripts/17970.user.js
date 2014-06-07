// ==UserScript==
// @name        Hatena Seemore seemore
// @description Kill seemore, I love netabare
// @namespace   http://lowreal.net/
// @include     http://d.hatena.ne.jp/*
// @include     http://*.g.hatena.ne.jp/*
// ==/UserScript==


(function () {

	$X("//p[@class='seemore']").forEach(function (p) {
		var url = $X(".//a", p)[0].href;

		GM_xmlhttpRequest({
			method : "GET",
			url : url,

			headers : {
			},

			onload : function (req) {
				var d = document.createElement("div");
				d.innerHTML = req.responseText;
				$X(".//a[@name='seemore']/following-sibling::*[not(@class='sectionfooter')]", d).forEach(function (e) {
					p.appendChild(e);
				});
			},

			onerror : function (req) {
				alert(req.responseText);
			}
		});
	});

	/* template functions  */
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
