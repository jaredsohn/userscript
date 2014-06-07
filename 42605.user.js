// ==UserScript==
// @name           VeryCD with MLDonkey
// @namespace      http://chaifeng.com/app
// @description    Click on the ed2k link directly
// @include        http://*.verycd.com/*
// ==/UserScript==

// configure here your MLdonkey web server ip and port
cfgServer   = "localhost";
cfgPort     = "4080";

document.addEventListener('click', function(event) {
    // event.target is the element that was clicked

    var a, submit_url;
   
    a = event.target;
    
    if (!a.href) {
    	return
    }
    
    if (a.href.match(/ed2k:\/\//)) {
    	// construct our command url
		submit_url = 'http://' + cfgServer + ':' + cfgPort + '/submit?q=dllink+' + encodeURIComponent(a.href);
		// and use an async http request
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: submit_url,
		    headers: {
		        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		        'Accept': 'application/atom+xml,application/xml,text/xml,*',
		    },
		    onload: function(responseDetails) {
		    	// display some user ack
		    	doc = responseDetails.responseText;
		    	newElement = document.createTextNode('[OK] ');
			 	a.parentNode.insertBefore(newElement, a.nextSibling);
		    }
		});
		event.stopPropagation();
    	event.preventDefault();
    }

}, true);
