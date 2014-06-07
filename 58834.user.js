// ==UserScript==
// @name           fix twitpic alt
// @namespace      http://efcl.info/
// @include        http://twitpic.com/*
// ==/UserScript==

function fixAlt(doc){
	var photoDisc = $x(doc ,'id("view-photo-caption")/text()')[0].textContent.replace(/^\s+/, "").replace(/\s+$/, "");
	var photo =$x(doc , 'id("photo-display")')[0];
	photo.setAttribute("alt" , photoDisc)
}
fixAlt(document);
if (window.AutoPagerize) {
	window.AutoPagerize.addDocumentFilter(function(doc) {
		fixAlt(doc);
	});
}
function $x(context, exp){
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