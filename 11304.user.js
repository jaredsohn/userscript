// ==UserScript==
// @name          Del.ici.ous Google
// @namespace     http://brighton.ucd.ie
// @description   Automatically bookmark clicked Google search results on del.icio.us under the terms in your search query
// @include       http://www.google.*/search*
// ==/UserScript==

//Author: Oisin Boydell
//Date: July 2007


(function() {
	
	
	
	if (! GM_xmlhttpRequest) 
	{
	    // Can't operate without GM_xmlhttpRequest
	    return;
	}
	
	
	//Add event listener for capturing when a result is selected
	document.addEventListener('click', function(e) {
		
		var theTarget = e.target;
		var resultUrl;
		var title;
		var snippet;
		var tags;
		var validResultClick = false;
			
		//Add attribute to prevent access priveledges problem
		theTarget.setAttribute("accessKey", "1");
		
		if (theTarget.hasAttribute("href") && theTarget.className == 'l')
		{
			resultUrl = extract_result_url(theTarget);	
			title = extract_result_title(theTarget);
			snippet = extract_result_snippet(theTarget);
			validResultClick = true;				
		}
		else if (theTarget.parentNode.hasAttribute("href") && theTarget.parentNode.className == 'l')
		{
			resultUrl = extract_result_url(theTarget.parentNode);
			title = extract_result_title(theTarget.parentNode);
			snippet = extract_result_snippet(theTarget.parentNode);
			validResultClick = true;							
		}
		
		//If the clicked element is a Google result link
		if (validResultClick)
		{
			tags = extract_search_terms();
			
			var deliciousUrlBase = "https://api.del.icio.us/v1/posts/add?";
			var deliciousUrlArgs = "url=" + resultUrl;
			deliciousUrlArgs += "&description=" + encodeURIComponent(title);
			deliciousUrlArgs += "&tags=" + encodeURIComponent(tags.join(" "));
			if (snippet.length > 0)
			{
				deliciousUrlArgs += "&extended=" + encodeURIComponent(snippet);		
			}
			
			//Send request to del.icio.us API
			GM_xmlhttpRequest({ method:  "GET",
	                            url:     deliciousUrlBase + deliciousUrlArgs,
	                            headers: {
	                                'User-agent':
	                                'Mozilla/4.0 (compatible)',
	                                'Accept': 'text/xml,application/xml',
	                            },
	                            onload: function(response) {
	                            	
	                            	//alert(response.responseText);
	                            	if (response.responseText.indexOf("\"done\"") < 0)
	                            	{
										alert("Del.icio.us posting of the Google result failed for some reason");
	                            		
	                            	}
	                            } });    
		}
	}, false);
		
	//Extracts the result URL. Returns a string.	
    function extract_result_url(target_element)
    {    	
		var url;
		var href = target_element.getAttribute("href");
		
		//check if its a re-written link
		if (target_element.getAttribute("onmousedown"))
		{
			//google proxied style link
			if (href.indexOf("/") == 0)
			{
				var args = href.split("&");						
				for (i in args)
				{				
					if (args[i].indexOf("url=") == 0)
					{				
						url = args[i].substring(4);
					}			
				}		
			}
			//link is same as original href
			else
			{
				url = href;				
			}				
		}
		else
		{			
			//If not rewritten just use the plain href attribute
			url = href;			
		}
		
		return url;    	
    }
		
		
	function extract_result_snippet(target_element)
	{
		var snippet = new String();
		var findPattern = "descendant::font";
		var resultLinks = document.evaluate( findPattern, target_element.parentNode.nextSibling, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		if ( (res = resultLinks.snapshotItem(0) ) !=null )
		{ 
			for (j in res.childNodes)
			{
				var node = res.childNodes[j];
				if ((node.nodeType == 3) || (node.nodeName == "B"))
				{
					if (node.nodeType == 3)
					{
						snippet += node.nodeValue;
					}
					else if (node.nodeName == "B")
					{
						snippet += node.childNodes[0].nodeValue;
					}
				}			
			}
		}		
		return snippet;
	}
		
		
	//Extracts the search result title. Returns a string.	
	function extract_result_title(target_element)
	{
		var children = target_element.childNodes;
		var title = "";
		
		for (i in children)
		{
			if (children[i].nodeType != 3 && children[i].firstChild)
			{
				if (children[i].firstChild.nodeType == 3)
					title += children[i].firstChild.nodeValue;				
			}
			else
			{
				if (children[i].nodeType == 3)
					title += children[i].nodeValue;
			}
		}
				
		return title;
	}
		
	//Extracts the search query terms from the page URL. Returns an array.
	function extract_search_terms()
	{
		var pageUrlargs = window.location.search.substring(1).split("\&");	
		
		var origTerms;
		for (i in pageUrlargs)
		{		
			if (pageUrlargs[i].indexOf("q=") == 0)
			{				
				var query = unescape(pageUrlargs[i].substring(2));
				//alert(query);
				
				origTerms = query.toLowerCase().replace(/[^\:a-zA-Z0-9_\+]/g,"").split("\+");
				
				var queryTerms = new Array();
				var index = 0;
				
				for (i in origTerms)
				{
					if (origTerms[i].indexOf(":") < 0)
					{
						queryTerms[index] = origTerms[i];
						index++;						
					}
				}
			}
		}
		
		return queryTerms;		
	}
})();


