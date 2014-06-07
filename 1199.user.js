// ==UserScript==
// @name          deviantART Big Thumbnails
// @namespace     http://romanito.free.fr/userscripts/
// @description	  Enable big thumbnails in deviantART pages
// @include       http://*deviantart.com/*
// @version       1.1
// ==/UserScript==

(function()
{
	function selectNodes(doc, context, xpath)
	{
	   var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	   var result = new Array( nodes.snapshotLength );

	   for (var i=0; i<result.length; i++)
	      result[i] = nodes.snapshotItem(i);

	   return result;
	}

	var doc = window.document;
   	var divs100 = selectNodes(doc, doc.body, "//DIV[contains(@class,'dev-100')]");
	var imgs, i, j;
	for (i=0; i<divs100.length; i++)
	{
		divs100[i].className = divs100[i].className.replace(/dev-100/i, "dev-150");
		imgs = selectNodes(doc, divs100[i], "//IMG");
		for (j=0; j<imgs.length; j++)
		{
			imgs[j].removeAttribute("width");
			imgs[j].removeAttribute("height");
			imgs[j].src = imgs[j].src.replace(/\/100\//i, "/150/");
		}
	}
})();
