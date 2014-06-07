// ==UserScript==
// @name amazon_regularization_url
// @namespace http://b.hatena.ne.jp/tcns
// @incldue http://www.amazon.com/s/*
// ==/UserScript==

/// === Utility v1.0.1 === ///
function XMLHttpRequestASync(method, url, func, opts) {
	if (!method || !url || !func) {
		return null;
	}

	var onerror = function () {
		alert('!!!ERROR!!!');
	}

	GM_xmlhttpRequest({
		method: method,
		url: url,
		headers: opts ? opts.headers ? opts.headers : '' : '',
		data: opts ? opts.data ? opts.data : '' : '',
		overrideMimeType: opts ? opts.overrideMimeType ? opts.overrideMimeType : '' : '',
		onreadystatechange: function (res) {
			if (res.readyState == 4 && res.status == 200) {
				func(res);
			}
		},
		onerror: opts ? opts.onerror ? opts.onerror : onerror : onerror
	});
};

function $x(exp, context) {
	if (!context) {
		context = document;
	}

	var ret = [];
	var evaluator = new XPathEvaluator();
	var expression = evaluator.createExpression(exp, null);
	var nodes = expression.evaluate(context, XPathResult.ORDERED_NODE_TYPE, null);
	for (var node = nodes.iterateNext(); node; node = nodes.iterateNext()) {
		ret.push(node);
	}

	return ret;
}

var $ = function (exp, root, tag) {
	if (!root) {
		root = document;
	}

	if (!tag) {
		tag = '*';
	}

	var ret = Array.filter(root.getElementsByTagName(tag), function (e) {
		if (e.id.match) {
			if (e.id.match(exp)) {
				return true;
			}
		}
	});

	return ret;
};

var $$ = function (tag, root) {
	if (!root) {
		root = document;
	}

	return root.getElementsByTagName(tag);
}

var Element = {
	create: function (elem, klass, id, text) {
		if (!klass && !id && !text) {
			return document.createElement(elem);
		}
		var obj = this.create(elem);
		if (klass && klass.length) {
			obj.className = klass;
		}
		if (id && id.length) {
			obj.id = id;
		}
		if (text && text.length) {
			obj.innerHTML = text;
		}
		return obj;
	}/*,
	remove: function (target) {
		document.body.removeChild(target);
	},

	removeById: function (id) {
		this.remove($(id));
	}
*/
};

var reguralization_url = function (entry) {
	if (!entry) {
		entry = $x('//table[@class="searchresults"]/tbody/tr/td');
	}

	entry.forEach(function (e) {
		Array.forEach($$('a', e), function (e) {
			if (e.href.match(/http:\/\/[^.]+\.[^.]+\.[^.]+\/dp\//)) {
				e.href = e.href.match(/http:\/\/[^.]+\.[^.]+\.[^.]+\/dp\/[^.]+?.\//)[0];
			}
		});
	});
}

// pageElement is `id("Results")' only ;)
// and more enlarge cover ;\)
var enlarge_cover = function (entry) {
	if (!entry) {
		entry = $x('id("Results")');
	}

	entry.forEach(function (e) {
		var columns = Array.filter($$('td', e), function (e) {
			if (e.className == 'imageColumn') {
				return true;
			}
		});

		columns.forEach(function (e) {
			var url = $$('a', e)[0].href;
			if (url) {
				XMLHttpRequestASync('GET', url, function (res) {
					var t = Element.create('img');
					var img = $$('img', e)[0];
					t.src = res.responseText.match(/http:\/\/ecx.images-amazon.com\/images\/.\/[^.]+/)[0] + '.jpg';
					img.src = t.src;
					var tid = setInterval(function () {
						if (t.width && t.height) {
							img.width = t.width;
							img.height = t.height;
							clearInterval(tid);
						}
					}, 2000);
				});
			}
		});
	});
}

var enlarge_cover_run = function () {
	if (window.AutoPagerize) {
		window.AutoPagerize.addFilter(enlarge_cover);
	}

	enlarge_cover();
}

// once
reguralization_url();

// add filter. if you are installed AutoPagerize ;)
if (window.AutoPagerize) {
	window.AutoPagerize.addFilter(reguralization_url);
}

// and minibuffer command
if (window.Minibuffer) {
	window.Minibuffer.addCommand({
		'amazon-enlarge-cover': enlarge_cover_run,
	});
}

GM_registerMenuCommand('Amazon.com - Enlarge cover', enlarge_cover_run);
