// Mininova + MLdonkey
// version 0.2 BETA!
// 2007-02-16
// Copyright (c) 2007, Gautier Portet	
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Mininova + MLdonkey", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Mininova + MLdonkey
// @namespace     http://kassoulet.free.fr
// @description   Make torrent links from mininova.org downloadable directly with MLdonkey
// @include       http://www.mininova.org/*
// ==/UserScript==


// configure here your MLdonkey web server ip and port
cfgServer   = "localhost";
cfgPort     = "4080";

document.addEventListener('click', function(event) {
    // event.target is the element that was clicked

    var a, submit_url;
   
    a = event.target;
    
    if (!a.href) {
    	// if element was not a link, it was probably an image inside a link,
    	// so use its parent.
	a = a.parentNode;
    }
   
    if (a.href.match(/\/get\//)) {
    	// the linked url contains /get/, good !

	// construct our command url
	submit_url = 'http://' + cfgServer + ':' + cfgPort + 
	'/submit?q=dllink+' + encodeURIComponent(a.href);

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




