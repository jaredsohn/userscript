// ==UserScript==
// @name           Reuters Article Printer
// @namespace      tag:bvrichthoffen@gmail.com,2007
// @description    Causes article links to load print version
// @include        http://*.reuters.com/*
// ==/UserScript==

articleLinks = document.evaluate(
  "//a[contains(@href,'/article')]",
  document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				
for (var i=0;i<articleLinks.snapshotLength;i++) {
  link = articleLinks.snapshotItem(i);
	
  beginOffset = link.href.indexOf('/id') + 3;	
  endOffset = link.href.indexOf('?',beginOffset);
  
  if (endOffset > 0) 
    articleID = link.href.substring(beginOffset,endOffset);
  else
    articleID = link.href.substring(beginOffset);	
		
  link.href = 'http://www.reuters.com/articlePrint?articleId=' + articleID;	
}