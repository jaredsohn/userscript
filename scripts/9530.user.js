// ==UserScript==
// @name          Hatena Search RadioButton Search Now
// @namespace     http://d.hatena.ne.jp/bluerabbit/
// @include       http://search.hatena.ne.jp/*
// ==/UserScript==
(function() {
	
	function main() {
		var inputs = $X('//input[@type="radio"]');
		for (i=0; i < inputs.length; i++) {
			inputs[i].addEventListener('click', function(){
				$S('//input[@type="submit"]').click();
			}, true);
		}
	}
	
	// -- [Templete] ----------------------------------------------------------------------

	// Firefox log api
	function log() { unsafeWindow.console.log.apply(unsafeWindow.console, Array.slice(arguments)) };

	function $X (exp, context) {
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
	
	function $S(xpath, context) {
		context = context || document;
		return document.evaluate(xpath, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}
	
	window.addEventListener('load', function(){main();}, false);
})();
