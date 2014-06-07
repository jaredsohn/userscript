// ==UserScript==
// @name           RLSLOG.net - No Consoles
// @namespace      http://juhani.naskali.net/files/gm/
// @description    Removes the console releases from RLSLOG.net
// @include        http://www.rlslog.net/*
// @exclude        http://www.rlslog.net/category/games/consoles/*
// @exclude        http://www.rlslog.net/author/*
// ==/UserScript==

function selectNodes(doc, context, xpath) {
   var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   var result = new Array( nodes.snapshotLength );

   for (var x=0; x<result.length; x++) {
	  result[x] = nodes.snapshotItem(x);
   }

   return result;
}

// Find console tags
var consoleLinks = selectNodes(window.document, window.document.body, "//A[contains(@title,'View all posts in Consoles')]");

// Delete the entries containing these tags
for (var i in consoleLinks) {
	//alert('Removed ' + consoleLinks[i].parentNode.parentNode.childNodes[1].innerHTML);
	consoleEntry = consoleLinks[i].parentNode.parentNode;
	consoleEntry.parentNode.removeChild(consoleEntry);
}