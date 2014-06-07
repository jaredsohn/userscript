// ==UserScript==
// @name tumblr_attention_regular
// @namespace http://b.hatena.ne.jp/tcns
// @include http://*.tumblr.com/*
// @exclude http://www.tumblr.com/dashboard
// ==/UserScript==

var pager = window.AutoPagerize;
if (!pager) {
	return;
}

/// === Utility v1.0.1 === ///
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

// === main === ///
const QUOTE_DEFAULT_SIZE = Number(Array.map(
	document.styleSheets[0].cssRules, function (e) {
		if (e.cssText.match(/quote/) && e.style.fontSize) {
			return e.style.fontSize.match(/\d+/);
		}
	}
).filter(function (e) {
	if (e) {
		return e;
	}
}).shift());

var attention_regular = function (entry) {
	if (!entry || !entry.length) {
		entry = $x('//div[@class="post"]');
	}

	Array.forEach(entry, function (e) {
		e = e.getElementsByTagName('div');
		Array.forEach(e, function (e) {
			if (e.className != 'regular') {
				return;
			}
			var h2 = e.getElementsByTagName('h2')[0];
			if (h2) {
				h2.style.fontSize = String(QUOTE_DEFAULT_SIZE) + 'px';
			}
			e.style.fontSize = String(QUOTE_DEFAULT_SIZE * 2) + 'px';
			e.style.lineHeight = '1.0';
		});
	});
};

var run = function () {
	// once
	attention_regular();

	// add filter
	pager.addFilter(attention_regular);
}

// minibuffer command
if (window.Minibuffer) {
	window.Minibuffer.addCommand({
		'tumblr-attention-regular': attention_regular
	});

	window.Minibuffer.addCommand({
		'tumblr-attention-regular-run': run
	});
}

GM_registerMenuCommand('Tumblr - attention regular', run);
