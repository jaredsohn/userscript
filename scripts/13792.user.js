// ==UserScript==
// @name tumblr_big_photo
// @namespace http://b.hatena.ne.jp/tcns
// @include http://www.tumblr.com/dashboard
// @version 0.2
// ==/UserScript==

var bigged = function (entry) {
	if (!entry) {
		entry = $x('//img[@class="image"]');
	} else if (entry.length < 2) {
		entry = $x('li/div/div[@class="post_container"]/a/img[@class="image"]', entry[0]);
	}

	Array.forEach(entry, function (e) {
		var img = new Image();
		img.src = e.src.replace(/\d{3}\.jpg/, function (res) {
			return '500.jpg';
		});

		var tid = setInterval(function () {
			if (img.complete) {
				clearInterval(tid);
				if (img.width && img.height) {
					e.src = img.src;
					e.parentNode.parentNode.parentNode.parentNode.style.width = img.width+24+'px';
				}
			}
		}, 200);
	});
}

// once
bigged();

// add filter
if (window.AutoPagerize) {
	window.AutoPagerize.addFilter(bigged);
}

// cho45 - http://lowreal.net/
function $x(exp, context) {
	var Node = unsafeWindow.Node;
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
				var item = result.snapshotItem(i);
				switch (item.nodeType) {
				case Node.ELEMENT_NODE:
					ret.push(item);
					break;
				case Node.ATTRIBUTE_NODE:
				case Node.TEXT_NODE:
					ret.push(item.textContent);
					break;
				}
			}
			return ret;
		}
	}
	return null;
}

