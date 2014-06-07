// ==UserScript==
// @name        Vox Change Lang on one click
// @namespace   http://lowreal.net/
// @include     http://*.vox.com/*
// @exclude     http://*.vox.com/services/editor/content*
// ==/UserScript==


(function () {
	const SHOW_LANGS = [
	'en',
	'fr',
	'ja',
	];
	var area = $N('div', {
		style: [
			'position: absolute',
			'top: 0',
			'right: 0',
			'background: #000',
			'color: #fff',
			'padding: 0.2em 1em',
			'font-size: 14px',
		].join(';')
	});
	SHOW_LANGS.forEach(function (l) {
		var ll = $N('a', {
			href:'javascript:void("fumino")',
			style: 'color: #fff',
		}, l);
		ll.addEventListener('click', function (e) {
			set_lang(l);
		}, false);
		area.appendChild(ll);
		area.appendChild(document.createTextNode(' '));
	});
	document.body.appendChild(area);

	function params2data(params) {
		var data = [];
		for (name in params) {
			if (!params.hasOwnProperty(name)) continue;
			if (!name) continue;
			params[name].forEach(function (i) {
				data.push(name+'='+encodeURIComponent(i));
			});
		}
		log(data);
		data = data.join('&');
		return data;
	}

	function set_lang(lang) {
		log('set lang to ' + lang);
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://www.vox.com/account/info',
			onload: function (req) {
				var t = $N('div');
				t.innerHTML = req.responseText;

				var params = {};
				['input', 'select', 'textarea'].forEach(function (i) {
					$X('.//form[@id="account-info"]//'+i, t).forEach(function (i) {
						var name  = i.name;
						var value = i.value;
						if (!params[name]) params[name] = [];
						params[name].push(value);
					});
				});
				params['locale'] = [lang];
				delete params['cancel'];
				log('%.o', params);

				var data = params2data(params);

				GM_xmlhttpRequest({
					method: "POST",
					url: 'http://www.vox.com/account/info',
					headers : {
						"Content-Type":"application/x-www-form-urlencoded"
					},
					data: data,
					onload: function (req) {
						location.reload();
					}
				});
			}
		});
	}


	/* template functions  */
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

