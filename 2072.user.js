// ==UserScript==
// @name          4chan /b/ CSS fix
// @description   Fix 4chan's /b/ board so that the Futaba and Burichan stylesheets point to the correct locations. If all else fails, point the default stylesheet to Futaba.
// @include       http://img.4chan.org/b/*
// ==/UserScript==

(function() {

		var futabaHref = 'http://www.4chan.org/css/futaba.css';
		var burichanHref = 'http://www.4chan.org/css/burichan.css';

	 	// Find the stylesheets

		var cssLinks = document.evaluate(
    		"//link[@rel='stylesheet' or @rel='alternate stylesheet']",
		    document,
    		null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    		null);    		

		var cssLink;
		var title;
		var styleFound = 0;
		
		for (var i = 0; i < cssLinks.snapshotLength; i++) {
    		cssLink = cssLinks.snapshotItem(i);
    		title = cssLink.getAttribute('title');
    		
    		// Check for Futaba or Burichan
    		if (title == 'Futaba')
    		{
    			// Futaba
    			if (cssLink.getAttribute('href') != futabaHref)
    				cssLink.setAttribute('href', futabaHref);
    				
    			styleFound = 1;
    		}
    		else if (title == 'Burichan')
    		{
    			// Burichan
    			if (cssLink.getAttribute('href') != burichanHref)
    				cssLink.setAttribute('href', burichanHref);
    				
    			styleFound = 1;
    		}
		}
		
		if (styleFound == 0) 
		{
			// Uh oh - Did not find Futaba or Burichan. Try taking corrective action by pointing the default stylesheet to Futaba.
			cssLink = document.evaluate(
    			"//link[@rel='stylesheet']",
			    document,
    			null,
		    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    		null).snapshotItem(0);
	    		
	    	if (cssLink)
	    	{
	    		cssLink.setAttribute('href', futabaHref);
	    	}
		}
		
})();