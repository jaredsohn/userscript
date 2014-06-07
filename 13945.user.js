// ==UserScript==
// @name soup.io_add_permalink
// @namespace http://d.hatena.ne.jp/yheld
// @include http://*.soup.io/*
// ==/UserScript==

var Config = {
	url: document.location.host,
	container: {
		className: 'add_permalink_container',
		id: 'add_permalink_container'
	},

	link: {
		className: 'add_permalink_link',
		id: 'add_permalink_link'
	}
};

if (Config.url.match(/www.soup.io/)) {
    return;
}

var Element = {
	create: function (elem, klass, id, html) {
		if (!klass && !id && !html) {
			return document.createElement(elem);
		}
		var obj = this.create(elem);

		if (klass && klass.length) {
			obj.className = klass;
		}

		if (id && id.length) {
			obj.id = id;
		}

		if (html && html.length) {
			obj.innerHTML = html;
		}

		return obj;
	}
};

var add_permalink = function (entry) {
	if (!entry) {
		entry = $x('//div[@class="meta"]/..');
	} else if (entry.length < 2) {
		entry = $x('div[@class]', entry[0]);
		entry = entry.slice(2, entry.length);
	}

	var permalink;
	var link;
	Array.forEach(entry, function (e) {
		container = Element.create(
			'div',
			Config.container.className,
			Config.container.id,
			'');
		link = Element.create(
			'a',
			Config.link.className,
			Config.link.id,
			'<a href="http://'+ Config.url +'/show/'+ e.id.match(/\d+/)[0]+'">permalink</a>');
		container.appendChild(link);

		// style
		link.style.letterSpacing = '0.8';
		container.style.textAlign = 'right';

		e.appendChild(container);
	});
};

// once
add_permalink();

// add filter
if (window.AutoPagerize) {
	window.AutoPagerize.addFilter(add_permalink);
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
