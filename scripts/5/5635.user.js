//The purpose of this script is to re-link torrent names to the individual desription pages and links the icon directly to the torrent. 
//This normalizes the browsing to behave as most other torrent sites work.
// ver 1.1

// ==UserScript==
// @name          pisexy relinker - link normalizer
// @namespace     http://www.digivill.net/~joykillr
// @description	  Normalizes the torrent links for browsing on pisexy
// @include       http://*.pisexy.org/browseall.php*
// @include       http://pisexy.org/browseall.php*
// @include       http://*.pisexy.org/browse.php*
// @include       http://pisexy.org/browse.php*
//
// ==/UserScript==

(function() 
{
	function selectNodes(doc, context, xpath) {
	   var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	   var result = new Array( nodes.snapshotLength );
	   
	   for (var x=0; x<result.length; x++) {
	      result[x] = nodes.snapshotItem(x);
	   }
	   
	   return result;
	}
	
	doc = window.document;
	
	
	var piLinks = selectNodes(doc, doc.body, "//A[contains(@href,'/download/')]");
	var piDLLinks = selectNodes(doc, doc.body, "//A[contains(@href,'/torrentinfo.php?id=')]");
	
	
	//dl links
	for (var x=0; x<piDLLinks.length; x++) 
	{
		for (var y=0; y<piLinks.length; y++) {
			var piName = piLinks[x].href.split("/")[5];
		}
		var piDown = piDLLinks[x].href.split(".php?id=")[1];
		piDLLinks[x].href = "http://www.pisexy.org/download/" + piDown + "/" + piName;
		piDLLinks[x].setAttribute("alt", "Download " + piName.split(".torrent")[0]);
		piDLLinks[x].setAttribute("title", "Download " + piName.split(".torrent")[0]);
	}
	
	
	//main links
	for (var x=0; x<piLinks.length; x++) 
	{
		var piStart = piLinks[x].href.indexOf("download/");
		piStart = piLinks[x].href.substr(piStart, 48);
		var piTor = piStart.split("/")[1];
		piLinks[x].href = "http://www.pisexy.org/torrentinfo.php?id=" + piTor;
		piLinks[x].setAttribute("alt", "Torrent Details");
		piLinks[x].setAttribute("title", "Torrent Details");
	}

}
)();
