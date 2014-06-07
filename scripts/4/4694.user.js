// ==UserScript==
// @name          New Tab on External Links
// @namespace     http://repo.securityteam.us/greasemonkey
// @description	  Adds a target_blank to off-site links so that they can open in a new tab and in the background (tabbrowser set appropriately)
// @include       http://del.icio.us/*
// @include       http*://*.google.*/search*
// @include       http://digg.com/*
// @include       http://www.digg.com/*
// @include       http://drudgereport.com/*
// @include       http://www.drudgereport.com/*
//
// ==/UserScript==

(function () {

  function parseURL(url) {
   var parts  = url.split('//');
   var domain = parts[1];
   
   if(domain.indexOf('/')) {
     var p  = domain.split('/');
     domain = p[0];
   }
   
   if(domain.indexOf(':')) {
     var d  = domain.split(':');
     domain = d[0];
   }
   
   return domain;
  }

	var external = document.links;
	for (var k=0; k<external.length; k++){
		if (external[k].href.indexOf(parseURL(document.URL)) < 0) {
			external[k].target = "_blank";
		}
	}
})();