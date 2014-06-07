// ==UserScript==
// @name        Fast Look up jp.wikipedia
// @namespace   http://d.hatena.ne.jp/hatecha/
// @description search on jp.wikipedia by selected word
// @include     http://*
// ==/UserScript==

(function () {
	var popups = [];
	limit =200;
	var urlbase = 'http://ja.wikipedia.org/wiki/';
	var urlbase2 = 'http://en.wikipedia.org/wiki/';
	var titlekey = './/div[@class="firstHeading"]';
	var contentkey = './/div[@id="bodyContent"]';
	var enlink ='';

	window.addEventListener("mouseup", function (e) {
		var selection = window.getSelection().toString();
		log(selection);
		if (!selection || selection.length >limit ) return;
		if (!selection.match(/^[^a-z\s]+$/i)) enlink = '<a href="'+urlbase2+selection+'">en</a>';

		GM_xmlhttpRequest({
			method: 'get',
			url: urlbase +selection,
			onload : function (req) {
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
											  'opacity: 0.9 !important',
											  'text-align: left',
											  ].join(';')});

				var t = $N('div');
				if (req.responseText.match(/<li id="ca-history"/i)){
					t.innerHTML = req.responseText;
					$X('.//div[@id="column-content"]/div[@id="content"]', t).forEach(function (e) {
						replUrl(e,urlbase +selection);
						area.appendChild(e);
						area.addEventListener('click', function (e) {
							e.stopPropagation();
						}, false);
						area.addEventListener('click', function (e) {
							area.style.display = 'none';
						}, false);
						document.body.appendChild(area);
						popups.push(area);
					});
				}
				/*
				else{
					main = $N('div');
					main.innerHTML = '"' + selection + '" is not found /jp.wikipedia';
					area.appendChild(main);
				}
				document.body.appendChild(area);
				popups.push(area);
				*/
			}
		});
	}, false);

	function replUrl(org,url) {
		org.innerHTML = org.innerHTML.replace(/href="\//g, 'href="http:\/\/ja.wikipedia.org\/');
		org.innerHTML = org.innerHTML.replace(/href="#/g, 'href="'+url+'#');
		org.innerHTML = org.innerHTML.replace(/document\.writeln/g, '');
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


// 2007/08/25 limit to content only. no-history, no-show.
// 2007/08/28 delete 'document.writeln'. show only when contents exist.
//            correct short link paths.
// 2007/09/01 delete timing changed, 'title' to 'anywhere', by click
//            correct 'opacity'
// 2007/09/09 limit length
