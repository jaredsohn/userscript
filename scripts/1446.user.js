/*
    SA Forums Spoiler Rewriter
    Rewrites spoilered text to be readable without mouseover
    Patrick Cavit, pcavit@gmail.com
    http://patcavit.com

    Copy, use, modify, spread as you see fit.
    Thanks to David Schontzler for helping me figure
    out how to deal with a HTMLSpanElement object.
*/
// ==UserScript==
// @name          SA Forums Spoiler Rewriter
// @namespace     http://patcavit.com/greasemonkey
// @description	  Removes mouseover on spoiler tags
// @include       http://forums.somethingawful.com/*
// ==/UserScript==

(function() 
{
	function getXPath(p, context) 
	{ 
		var arr = new Array(); 
		var xpr = document.evaluate(p,context,null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
		for(i = 0;item = xpr.snapshotItem(i); i++)
		{ 
			arr.push(item); 
		} 
	
		return arr; 
	}

	doc = window.document;
	var xpath = "//span[@class='spoiler']";
	
	results = getXPath(xpath, doc);
	
	for(i = 0; i < results.length; i++)
	{
		results[i].removeAttribute('onmouseover');
		results[i].removeAttribute('onmouseout');
		results[i].setAttribute('style', 'color: white');
	}
}
)();