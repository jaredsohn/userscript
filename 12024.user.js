// ==UserScript==
// @name        Fast Look up Alc
// @namespace   http://lowreal.net/
// @include     http://*
// ==/UserScript==


(function () {
	var popups = [];
	window.addEventListener("mouseup", function (e) {
		var selection = window.getSelection().toString();
		log(selection);
		if (!selection || !selection.match(/^[a-z\s]+$/i) || selection.match(/^\s+$/)) return;
		GM_xmlhttpRequest({
			method: 'get',
			url: 'http://eow.alc.co.jp/'+selection+'/',
			onload : function (req) {
				var t = $N('div');
				t.innerHTML = req.responseText;
				$X('.//li[span[@class="midashi"] and (position() = 1)]', t).forEach(function (e) {
					var area = $N('div', {style: [
						'position: fixed',
						'bottom: 0',
						'left: 0',
						'right: 0',
						'border: 1px solid #000',
						'background: #fff',
						'color: #000',
						'max-height: 50%',
						'overflow: auto',
						'opacity: 0.9'
					].join(';')});
					area.appendChild(e);
					area.addEventListener('click', function (e) {
						e.stopPropagation();
					}, false);
					$X('.//span[@class="midashi"]', area)[0].addEventListener('click', function (e) {
						area.style.display = 'none';
					}, false);
					document.body.appendChild(area);
					popups.push(area);
				});
			}
		});
	}, false);
	document.body.addEventListener('click', function (e) {
		var e;
		while (e = popups.pop()) {
			e.parentNode.removeChild(e);
		}
	}, false);

	/* template functions  */
	function log () {
		var c = unsafeWindow.console;
		//if (c) c.log.apply(c, arguments);
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

