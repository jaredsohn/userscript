// ==UserScript==
// @name           AntiDD
// @namespace      AntiDD
// @include        http://forum.aceboard.net/29408-*
// ==/UserScript==


   var result=document.evaluate( '/html/body/div/div/table/tbody/tr/td[contains(@class,"master")]/b' ,document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
 try {  
  var thisNode = result.iterateNext();  
    var cpt=0;
	var inter="";
  while (thisNode) {  
	cpt++;
	
		
	if(thisNode.innerHTML=="&nbsp;Dédé"){

	
	inter=cpt+2;
	
	
	// find first <pre> on this page 
	
var xpathResult = document.evaluate('/html/body/div/div/table['+inter+']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
var node=xpathResult.singleNodeValue;

node.style.display='none';
	}
    
 thisNode = result.iterateNext();  
  }   
}  
catch (e) {  
  dump( 'Error: Document tree modified during iteration ' + e );  
}  
