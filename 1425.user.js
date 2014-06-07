// ==UserScript==
// @name	newzbindd
// @namespace	http://none.none/greasemonkey
// @description	Replace editor field with a direct download link
// @include	http://www.newzbin.com/*
// ==/UserScript==

(function() 
{
	function selectNodes(doc, context, xpath) 
	{
	   var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	   var result = new Array( nodes.snapshotLength );
	   
	   for (var x=0; x<result.length; x++) 
	   {
	      result[x] = nodes.snapshotItem(x);
	   }
	   
	   return result;
	}
	
	doc = window.document;
	
  var nbLinks = selectNodes(doc, doc.body, "//A[contains(@href,'/browse/post/') and not(contains(@href,'Comments'))]");
  var edLinks = selectNodes(doc, doc.body, "//A[contains(@href,'/browse/editor/')]");
   
	for (var x=0; x<nbLinks.length; x++) 
	{

			    var dl = document.createElement('a');
			    dl.href = nbLinks[x].href + "msgidlist";
			    dl.appendChild(document.createTextNode('[download]'));
			    edLinks[x].parentNode.replaceChild(dl,edLinks[x]);
		
	}
})();
