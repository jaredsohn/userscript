// ==UserScript==
// @name          4chan Anonymizer
// @description   Make everyone on 4chan appear as Anonymous - remove all names, tripcodes, and emails other than sage
// @include       http://*.4chan.org/*
// ==/UserScript==

(function() {

	 	// Remove all linkmail (unless they are being used for sage) and postertrip elements

		var toRemove = document.evaluate(
    		"//a[@class='linkmail' and @href!='mailto:sage']|//span[@class='postertrip']",
		    document,
    		null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    		null);

		var element;
		
		for (var i = 0; i < toRemove.snapshotLength; i++) {
    		element = toRemove.snapshotItem(i);
    		element.parentNode.removeChild(element);
    	}
    	
    	// Set the contents of all postername, commentpostername, and remaining linkmail elements to Anonymous
    	
		var posterNames = document.evaluate(
    		"//span[@class='postername' or @class='commentpostername']",
		    document,
    		null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    		null);

		for (var i = 0; i < posterNames.snapshotLength; i++) {
    		element = posterNames.snapshotItem(i);
   			setPosternameInnerText(element, 'Anonymous');
    	}
    	
	function setPosternameInnerText(element, text)
	{
   		if (typeof element.innerText != 'undefined') 
   		{
     		element.innerText = text;
   		}
   		else if (element.hasChildNodes) 
   		{
     		var childNode;
     		var linkmailFound = 0;
     		
     		// Go through the child nodes - remove anything that's not a linkmail element.
     		// If linkmail element is found, set its inner text; otherwise, create a new
     		// text node for the inner text.
     		
     		for (var i = 0; i < element.childNodes.length; i++)
     		{
     			var childNode = element.childNodes[i];
     			
     			if ((childNode.nodeType == Node.ELEMENT_NODE) && (childNode.tagName.toLowerCase() == 'a') && (childNode.getAttribute('class').toLowerCase() == 'linkmail'))
     			{
     				setLinkmailInnerText(childNode, text);
     				linkmailFound = 1;
     			}
     			else
     			{
     				element.removeChild(childNode);
     			}
     		}
     		
     		if ((linkmailFound == 0) && element.appendChild)
	     		element.appendChild(document.createTextNode(text));
   		}
	}
	
	function setLinkmailInnerText(element, text) {
    	if (typeof element.innerText != 'undefined') 
    	{
     		element.innerText = text;
   		}
   		else if (element.hasChildNodes && element.appendChild) 
   		{
     		while (element.hasChildNodes()) 
     		{
       			element.removeChild(element.lastChild);
     		}
	     	
	     	element.appendChild(document.createTextNode(text));
   		} 
	}
		
})();