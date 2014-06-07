// ==UserScript==
// @name           SportBort - dagbladet
// @namespace      www.kvasbo.no
// @include        http://www.dagbladet.no/
// ==/UserScript==

    
	var allLinks, thisLink;
	var debug = "";
	
	allLinks = document.evaluate(
   	 '//a[@href]',
   	 document,
   	 null,
   	 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
   	 null);

	for (var i = 0; i < allLinks.snapshotLength; i++) {
    
    	//Gå igjennom alle lenker
   		 thisLink = allLinks.snapshotItem(i);
    	
    	var foundIt = thisLink.href.search("sport");
    	
    	if(foundIt == -1)
    	{
    		var foundIt = thisLink.href.search("kjendis");
    	}
    	
    	if(foundIt > 0)
    	{
    		
    		debug = thisLink.href;
    		
    		
    		var parentDiv = thisLink.parentNode;
    		
    		//Fjern barnet til forelder til barnet.
    		
    		thisLink.parentNode.parentNode.removeChild(thisLink.parentNode);
    		
    	}
    }

