// ==UserScript==
// @name           BB4 NY fixer
// @namespace      tag:brainonfire.net,2007-09-11:rewrite
// @description    Fix images and links
// @include        http://207.251.86.248/images_250/bb/*
// ==/UserScript==

/* From http://wiki.greasespot.net/Code_snippets */
function $x(p, context)
{
	if(!context)
		context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}


try
{
	var oneIDNode = undefined;
	var oneLink = undefined;

	$x("//*[@*[starts-with(., '/bb')]]").forEach(function(oneEl, elDex, allEl)
	{
		$x("./@*[starts-with(., '/bb')]", oneEl).forEach(function(oneAttr, attrDex, allAttr)
		{
			oneEl.setAttribute(oneAttr.localName, '/images_250'+oneEl.getAttribute(oneAttr.localName));
		});
	});
}
catch(e)
{
	console.log("Caught exception in bb4 NY userscript: "+e);
}