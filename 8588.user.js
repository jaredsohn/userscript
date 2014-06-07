// ==UserScript==
// @name           Spam user clenaer in userscripts.org
// @namespace      http://userjs.0fk.org
// @description    Remove comment of spam user
// @include        http://userscripts.org/scripts/show/*
// @version        0.0.1
// ==/UserScript==

(function () {

var BLACK_LIST = [
	'chenyangwei',
];

$E('//table[@class="posts wide"]//tr[@class="post hentry"]//span[@class="fn"]/a[text()="' + BLACK_LIST.join('" or text()="') + '"]/../../..').forEach(function (node) {
	var spacer = node.nextSibling;
	while (spacer.nodeName.toUpperCase() != 'TR')
		spacer = spacer.nextSibling;
	var parent = node.parentNode;
	parent.removeChild(spacer);
	parent.removeChild(node);
});

function $E(xpath, context) {
	context = context || document;
	var iterator = document.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null), res = [];
	for (var node = iterator.iterateNext(); node; node = iterator.iterateNext())
		res.push(node);
	return res;
}

})()
