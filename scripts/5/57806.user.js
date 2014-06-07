// ==UserScript==
// @name          Skip Redirector
// @namespace     http://codefairy.org/ns/userscripts
// @include       *
// @version       1.1.3
// @license       MIT License
// @work          Greasemonkey
// @work          GreaseKit
// ==/UserScript==

new function() {
	const API = 'http://wedata.net/databases/Redirector/items.json';
	const EXPIRES = 7;

	var greasemonkey = (typeof unsafeWindow != 'undefined');
	var now = +new Date;

    localSITEINFO=[
       /*
       {data:{
          url: '',
          link:'',
          replace_url:'',
          site_url:'',
          fixme: false,
          example_url:'',
       }},
       */
    ];

	handler(localSITEINFO);
	if (greasemonkey)
		GM_registerMenuCommand('Skip Redirector Clear SITEINFO Cache', save);

	var timer, complete = false;
	var stash = load();
	if (stash && stash.expires >= now)
		handler(stash.data);
	else {
		if (greasemonkey)
			GM_xmlhttpRequest({
				method: 'GET',
				url   : API,
				onload: function(r) {
					clearTimeout(timer);
					var data = JSON.parse(r.responseText);
					save(data);
					if (!complete) handler(data);
				}
			});
		else if (document.body) {
			window.userscript_skip_redirector_jsonp = function(data) {
				clearTimeout(timer);
				save(data);
				if (!complete) handler(data);
			};
			var s = document.createElement('script');
			s.type    = 'text/javascript';
			s.src     = API+'?callback=userscript_skip_redirector_jsonp';
			s.charset = 'utf-8';
			document.body.appendChild(s);
		}
		if (stash)
			timer = setTimeout(function() {
				complete = true;
				handler(save(stash.data));
			}, 1000 * 30);
	}


	function handler(data) {
		var i = data.length;
		while (i--) {
			var item = data[i].data;
			if (item.fixme) continue;
			var url = item.url;
			var link = item.link;
			var replace_url = item.replace_url;
			if (new RegExp(url).test(location.href)) {
				if (replace_url) {
					var reditrect_url = decodeURIComponent(location.href.replace(new RegExp(url), replace_url));
					if (/^https?:\/\//.test(reditrect_url)) {
						location.href = reditrect_url;
						return;
					}
				}
				else if (link) {
					var a = $X(link)[0];
					if (a) {
						if(greasemonkey && a.nodeName==='A' && a.href) return location.replace(a.href);
						var e = document.createEvent('MouseEvent');
						e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						a.dispatchEvent(e);
						return;
					}
				}
			}
		}
	}

	function load() {
		var stash = greasemonkey ? GM_getValue('stash') : localStorage.userscript_skip_redirector_stash;
		// compatibility
		try {
			return (stash && JSON.parse(stash));
		}
		catch (e) {
			return undefined;
		}
	}

	function save(data) {
		var stash = data ?
			JSON.stringify({
				data   : data,
				expires: +new Date + 1000 * 60 * 60 * 24 * EXPIRES
			}) :
			'';
		if (greasemonkey)
			GM_setValue('stash', stash);
		else {
			if (stash) localStorage.userscript_skip_redirector_stash = stash;
			else delete localStorage.userscript_skip_redirector_stash;
		}
		return data;
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
