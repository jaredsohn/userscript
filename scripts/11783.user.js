// ==UserScript==
// @name		  userscripts.org add Hatebu Count
// @namespace	  http://d.hatena.ne.jp/bluerabbit/
// @include		  http://userscripts.org/*
// ==/UserScript==

(function() {

	// -- [Main] ----------------------------------------------------------------------

	function main() {
		var resultItems = $X('//td[@class="script-meat"]');
		for (var i = 0; i < resultItems.length; i++) {
			var item = resultItems[i];
			
			// for AutoPager -- START
			if (($X('.//a[@class="hatebu"]', item).length != 0)) {
				continue;
			}
			// for AutoPager -- END
			var url = $S('.//a[@class="title"]', item).href;
			item.appendChild(createHatebuEntryImg(url));
			var n = $N('img', {'src':'http://b.hatena.ne.jp/entry/image/large/' + url,'style':'margin-bottom:-5px;border:0pt none;'});
			var a = $N('a', {'href':'http://b.hatena.ne.jp/entry/' + url});
			a.appendChild(n);
			item.appendChild(a);
		}
	}

	function createHatebuEntryImg(url) {
		var TEXT = '\u3053\u306E\u30A8\u30F3\u30C8\u30EA\u30FC\u3092\u542B\u3080\u30D6\u30C3\u30AF\u30DE\u30FC\u30AF';
		var img = $N('img', {'width':'16', 'height':'12','align':'absmiddle','title':TEXT,'alt':TEXT,'style':'border:0pt none;'});
		img.src = 'data:image/gif;base64,'+
				    'R0lGODlhEAAMAIAAABhBzv///yH5BAAAAAAALAAAAAAQAAwAAAIjDI6ZFu3/DjSrSWZB3mjTrFDV'+
				    'pXkf6Vxn2amSmobfRGvK3RUAOw==';
		var x = $N('a', {'href':'http://b.hatena.ne.jp/entry/' + url, 'class':'hatebu'});
		x.appendChild(img);
		return x;
	}
	
	// for AutoPager
    var scrollHeight = document.documentElement.scrollHeight;
    document.addEventListener(
    	"scroll",
		function(e){
			if(scrollHeight != document.documentElement.scrollHeight){
				scrollHeight = document.documentElement.scrollHeight;
				main();
			}
		},false);


	// -- [Templete] ----------------------------------------------------------------------

	// Firefox log api
	function log() { unsafeWindow.console.log.apply(unsafeWindow.console, Array.slice(arguments)) };

	function $(element) {
		return document.getElementById(element);
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
	
	unsafeWindow.$X=$X;
	
	window.addEventListener('load', function(){main();}, false);
})();