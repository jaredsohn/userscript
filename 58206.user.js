// ==UserScript==
// @name           Enlarge favotter Icons
// @namespace      http://efcl.info/
// @include        http://favotter.net/*
// ==/UserScript==

var favUsers = $X('//span[@class="favotters"]/a/img');
for(var i=0;i<favUsers.length;i++){
	var iconSrc = favUsers[i].getAttribute("src");
	var normalIcon = iconSrc.replace("mini" , "normal");
	favUsers[i].setAttribute("src" , normalIcon);
}
GM_addStyle(<><![CDATA[
	img.fav_icon {
		height:48px!important;
		width:48px!important;
	}
]]></>);

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