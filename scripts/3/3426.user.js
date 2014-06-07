// ==UserScript==
// @name        Show Word Count
// @namespace   http://lowreal.net/
// @include     http://wordlink.hatelabo.jp/*/
// ==/UserScript==

(function () {
	$N = function (name, attr, childs) {
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

	var num = document.evaluate(
		"count(//ul[@class='wordcloud']/li)",
		document,
		null,
		XPathResult.NUMBER_TYPE,
		null).numberValue;

	document.body.appendChild($N("div", {
		style: ["position: fixed",
				"bottom: 2px",
				"right: 2px",
				"padding: 0 0.5em",
				"background: #000",
				"color: #fff",
				"opacity: 0.8",
				"font-size: 80%"].join(";")
	}, "Word Count: " + num));
	
})();
