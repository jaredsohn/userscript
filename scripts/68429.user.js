// ==UserScript==
// @name           hide freelance ad
// @namespace      hda
// @description    hide freelance ad
// @include        http://www.free-lance.ru/
// ==/UserScript==

 var xpath = function(node, expr) {
	var xpe = new XPathEvaluator();
	var nsResolver = xpe.createNSResolver(node.ownerDocument == null ?
		node.documentElement : node.ownerDocument.documentElement);
	var result = xpe.evaluate(expr, node, nsResolver, 0, null);
	var ret = [];
	var res;
	while (res = result.iterateNext()) { ret.push(res); }
	return ret;
  };

 
function hideDiv(cls) {
	div = xpath(document, "//div[normalize-space(@class)='"+cls+"']");
	if (div.length==1)
	{
		div = div[0];
		div.style.display = "none"
	}

}

hideDiv("top-payed");
hideDiv("leftcol");
hideDiv("header-advert clear");
