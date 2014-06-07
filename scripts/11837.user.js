// ==UserScript==
// @name        Fast Look up b.hatena.tag
// @namespace   http://d.hatena.ne.jp/hatecha/
// @description search on b.hatena.tag by selected word
// @include     http://*
// ==/UserScript==

(function () {
	var popups = [];
	limit =200;
	var urlbase = 'http://b.hatena.ne.jp/t/';

	window.addEventListener("mouseup", function (e) {
		var selection = window.getSelection().toString();
		log(selection);
		if (!selection || selection.length >limit ) return;

		GM_xmlhttpRequest({
			method: 'get',
			url: urlbase +selection+'?sort=count',
			onload : function (req) {
				var t = $N('div');
				var count =0;
				t.innerHTML = req.responseText;
				var area = $N('div', {style: [
										  'position: fixed',
										  'top: 0',
										  'left: 0',
										  'right: 0',
										  'border: 1px solid #000',
										  'background: #fff',
										  'color: #000',
										  'max-height: 48%',
										  'overflow: auto',
										  'opacity: 0.9',
										  'text-align: left',
										  ].join(';')});

				$X('.//div[@id="breadcrumbs"]', t).forEach(function (e) {
					replUrl(e);
					area.appendChild(e);
					area.appendChild($N('hr'));
				});
				$X('.//div[@class="entry"]', t).forEach(function (e) {
					count ++;
					replUrl(e);
					area.appendChild(e);
				});
				area.addEventListener('click', function (e) {
					e.stopPropagation();
				}, false);
				area.addEventListener('click', function (e) {
					area.style.display = 'none';
				}, false);
				if( count>0 ){
					popups.push(area);
					document.body.appendChild(area);
				}
			}
		});
	}, false);

	function replUrl(org) {
		org.innerHTML = org.innerHTML.replace(/href="\//g, 'href="http:\/\/b.hatena.ne.jp\/');
		org.innerHTML = org.innerHTML.replace(/src="\//g, 'src="http:\/\/b.hatena.ne.jp\/');
		org.appendChild($N('br'));
	}
	

	document.body.addEventListener('click', function (e) {
		var e;
		while (e = popups.pop()) {
			e.parentNode.removeChild(e);
		}
	}, false);

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


// 2007/09/01 
// 2007/09/01 no exist ,no show
// 2007/09/09 limit length
