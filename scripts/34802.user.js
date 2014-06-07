//  Package:  Mozilla Greasemonkey user scripts
//  File:     external_links.user.js
//  Version:  0.0.1
//  Date:     2008/10/01
//
//  Copyright (c) 2008, Mick Sharpe
//
//  Revision History:
//  0.0.1     2008/10/01	Initial beta version.
//
//  Mozilla Greasemonkey script to 
//
// ==UserScript==
// @name          external_links
// @namespace     http://www.micksharpe.com/
// @description   Munges ADSLguide forums - version 0.0.1 (beta)
// @include       *
// ==/UserScript==

(function() {
	window.addEventListener ("load", eventListener, false);
	
	function eventListener (e) {
	  links = document.getElementsByTagName("a");
	  
//	  consoleMessage("Found " + links.length + " links");
	  
	  for (i = 0; i < links.length; i++) {
	    link = links[i];
	    
//	    consoleMessage("Found link: " + link.href);
	    
	    if (isExternalLink(link.href)) {
	      if (link.target == null) {
	        link.target = "_blank";
	      }
	    }
	  }
	}
	
	function isExternalLink(href) {
//    consoleMessage("Matching: [" + href + "]");
	  external = /^http[s]?\:\/\//.test(href);
//    consoleMessage("Match is " + external);
	  if (external) {
	    match = href.match(/^http[s]?\:\/\/([^\/]*)/);
	    domain = match[1];
//	    consoleMessage("Domain is [" + domain + "]");
	    external = domain != document.domain;
	  }
//	  consoleMessage("Link is " + (external ? "external" : "internal"));
	  
	  if (external) {
	    consoleMessage("Found external link: " + href);
	  }
	  
	  return external;
	}
  
  function consoleMessage (message) {
    if ( GM_log ) {
      GM_log (message);
    } else {
      // Use this kludge if GM_log is unavailable
      setTimeout (function(){throw(message)}, 0);
    }
  }
	  
})();