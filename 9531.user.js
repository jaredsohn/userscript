// ==UserScript==
// @name		  Google Search Add Hatebu Count
// @namespace	  http://d.hatena.ne.jp/bluerabbit/
// @include		  http://www.google.co.jp/searc*
// ==/UserScript==

(function() {

	// -- [Main] ----------------------------------------------------------------------

	function main() {
		var resultItems = $X('//div[@class="g"]');
		for (var i = 0; i < resultItems.length; i++) {
			var item = resultItems[i];
			var url = $X('.//a[@class="l"][@href]', item)[0].href;
			var nobr = $S('.//nobr', item);
			nobr.appendChild(createHatebuEntryImg(url));
			var n = $N('img', {'src':'http://b.hatena.ne.jp/entry/image/large/' + url,'style':'margin-bottom:-5px;border:0pt none;'});
			var a = $N('a', {'href':'http://b.hatena.ne.jp/entry/' + url});
			a.appendChild(n);
			nobr.appendChild(a);
		}
	}

	function createHatebuEntryImg(url) {
		var TEXT = '\u3053\u306E\u30A8\u30F3\u30C8\u30EA\u30FC\u3092\u542B\u3080\u30D6\u30C3\u30AF\u30DE\u30FC\u30AF';
		var img = $N('img', {'width':'16', 'height':'12','align':'absmiddle','title':TEXT,'alt':TEXT,'style':'border:0pt none;'});
		img.src = 'data:image/gif;base64,'+
				    'R0lGODlhEAAMAIAAABhBzv///yH5BAAAAAAALAAAAAAQAAwAAAIjDI6ZFu3/DjSrSWZB3mjTrFDV'+
				    'pXkf6Vxn2amSmobfRGvK3RUAOw==';
		var x = $N('a', {'href':'http://b.hatena.ne.jp/entry/' + url});
		x.appendChild(img);
		return x;
	}

	// -- [Templete] ----------------------------------------------------------------------

	// Firefox log api
	function log() { unsafeWindow.console.log.apply(unsafeWindow.console, Array.slice(arguments)) };

	function $(element) {
		return document.getElementById(element);
	}
	
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
	function $N (name, attr, childs) {
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
	function $S(xpath, context) {
		context = context || document;
		return document.evaluate(xpath, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}
	
	window.addEventListener('load', function(){main();}, false);
})();