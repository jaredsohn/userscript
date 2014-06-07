// ==UserScript==
// @name           Twitter XSS
// @namespace      http://twitter.com/33
// @include        http://twitter.com/home
// ==/UserScript==

$x('//span[@class="entry-content"]').forEach(function(entry){
	try{
		eval(entry.textContent);
	} catch(e){}
});

// -- [Utility - DOM] ------------------------------------------------------
function $x(exp, ctx){
	var res = document.evaluate(exp, (ctx || document), null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	for(var i, nodes = [] ; i=res.iterateNext() ; nodes.push(i));
	return nodes;
}