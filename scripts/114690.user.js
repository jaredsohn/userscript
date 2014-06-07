// ==UserScript==
  // @name		   MUFILM Redirector fucker
  // @namespace	  *
  // @include		http://www.mufilm.com/Redirection.php
  // ==/UserScript==
  
  
(function() {
  	// get all the links of the page
  	var allLinks = document.links;
  	// loop on all links
  	for (var i in allLinks) {
  		var link = allLinks[i];
  		var xref;
  
  		try {
  			// Get redirected url
  			xref = link.getAttribute("href");
  
  			var x = xref.indexOf('http://www.megaupload.com/?d=');
  			if (x != -1) {
  							
  				x= xref.indexOf('=');
  				xref = decodeURIComponent(xref.substring(x+1));
  				if (xref.indexOf('*http://') != 1)
  				 {
  						 xref = 'http://www.megaupload.com/?d='+ xref;	
  					}
  			
	location.href = (xref);
  			}
  		}
  		catch(e) {
  			// Do nothing with errors returned by the function. Just here to hide them in the JS Console.
  		}
  	}
  })();