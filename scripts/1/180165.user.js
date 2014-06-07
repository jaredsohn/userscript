// ==UserScript==
// @name        smurfy Mechlab
// @namespace   smurfy
// @include     *
// @exclude     http://mwo.smurfy-net.de/
// @version     1
// @grant       none
// ==/UserScript==

(function() {

    if ((document.location.host == 'mwo.smurfy-net.de') || (document.location.host == 'mwo-builds.net')) {
        return;
    }

	var ex = "//a[contains(@href,'mwo.smurfy-net.de')]";
	var tag = document.evaluate
			( 
				ex,
				document,
				null,
				XPathResult.ANY_TYPE,
				null
			);
			
	var linkElement = tag.iterateNext();
	
    var linkElements = [];

	while (linkElement)
	{  
    	linkElements.push(linkElement);

		linkElement = tag.iterateNext();
	}
	
	for (var i = 0; i < linkElements.length; i++) {
	    linkElement = linkElements[i];
        var url = linkElement.getAttribute('href');
	    var newurl = url.replace('mechlab#', 'tools/mechtooltip?');
	    
	    if (newurl != url) {
            linkElement.outerHTML = '<iframe src="' + newurl + '" width="100%" height="300" frameborder="0"></iframe>';
	    }

	}
	
})();