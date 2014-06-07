// ==UserScript==
// @name tumblr_regular_only
// @namespace http://b.hatena.ne.jp/tcns
// @include http://*.tumblr.com/*
// ==/UserScript==

(function () {
var pager = window.AutoPagerize;
if (!pager) {
	return;
}

var regular_only = function () {
	// once
	$x('//div[@class]/div').forEach(function (e, i) {
		if (e.className.match(/[^regular]/)) {
			DOM.hide(e);
		}
	});

	// add filter
	pager.addFilter(function (entry) {
		Array.forEach(entry, function (e, i) {
			Array.forEach(e.getElementsByTagName('div'), function (e) {
				if (e.className.match(/[^regular]/)) {
					DOM.hide(entry[i]);
				}
			});
		});
	});
};

GM_registerMenuCommand('Tumblr - regular only mode', regular_only);

// misc
var $x = function (exp, root) {
	if (!root) root = document;
	var r = new Array;
	var nodes = document.evaluate(exp, root, null, XPathResult.ORDERED_NODE_TYPE, null);

	for (var node = nodes.iterateNext(); node; node = nodes.iterateNext()) {
		r.push(node);
	}
	return r;
}

var DOM = {
	hide: function (target) {
		target.style.display = 'none';
	}
};
})();
