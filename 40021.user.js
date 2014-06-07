// ==UserScript==
// @name           PureTNA.com Direct Download
// @namespace      
// @description    Replaces the Download Page with Download Link
// @include        *.puretna.*
// @exclude        
// ==/UserScript==

var pageLinks;

pageLinks = document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var i = 0, a;
while((a = pageLinks.snapshotItem(i++)))
{
  // do the swap
  if(a.href.match("dlpage.php"))
  {    
    a.href = a.href.replace("www.puretna.com", "download.puretna.com");	  
    a.href = a.href.replace("dlpage.php?&id=", "download.php?&i=");	  
  }   
}