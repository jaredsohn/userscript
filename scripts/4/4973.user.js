// ==UserScript==
// @name          SubDivX Relinker
// @namespace     http://erwin.ried.cl
// @description	  Crea un enlace directo a los subtítulos de subdivx.com
// @include       http://www.subdivx.com/*
// ==/UserScript==

(function() 
{
	function selectNodes(doc, context, xpath) 
	{
	   var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	   var result = new Array( nodes.snapshotLength );
	   
	   for (var x=0; x<result.length; x++) 
	      result[x] = nodes.snapshotItem(x);
	   
	   return result;
	}
	
	doc = window.document;
   	var subdivxLinks = selectNodes(doc, doc.body, "//A[contains(@href,'X6X')][contains(@href,'.html')]");
   
	for (var x=0; x<subdivxLinks.length; x++) 
	{
		var divxmatch = subdivxLinks[x].href.match( /X6X(.*?)X/ );

		if (divxmatch) 
			subdivxLinks[x].href = "http://files.subdivx.com/" + divxmatch[1] + ".zip";
	}
})();
