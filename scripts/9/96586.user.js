// MQ redirector, based on the 
// UMich Proxy Redirector
// version 1 (2006-08-12)
// Rick Wash <rwash@umich.edu>
//
// This work is licensed under the Creative Commons Attribution 2.5 License.
// To view a copy of this license, visit http://creativecommons.org/licenses/by/2.5/
// or send a letter to Creative Commons, 543 Howard Street, 5th Floor,
// San Francisco, California, 94105, USA.
//
// Based on the HTTP-to-HTTPS script
//
// ==UserScript==
// @name	MQ Proxy Redirector
// @namespace	http://www.curiousjason.com
// @description	Replace URL in the address bar with one that goes through the MQ Library proxy.
// @include	http://www.jstor.org/*
// @include	http://www.leaonline.com/*
// @include 	http://www.sciencedirect.com/*
// @include     http://www.springerlink.com/*
// @include	http://portal.acm.org/*
// @include	http://dx.doi.org/*
// @include	http://www.nature.com/*
// @include	http://*.ovid.com/*
// @exclude	http://*.mq.edu.au/*
// ==/UserScript==
(function(){
  var debug = 0;
  if ( debug > 0 ) {
    alert(  "Hash:     "+location.hash+
          "\nHost:     "+location.host+
          "\nHostname: "+location.hostname+
          "\nHREF:     "+location.href+
          "\nPathname: "+location.pathname+
          "\nPort:     "+location.port+
          "\nProtocol: "+location.protocol+
	  "\n"+
	  "\nNew Location: "+location.href.replace(/http\:\/\/([^\/]*)\//, 'http:\/\/$1.simsrad.net.ocs.mq.edu.au\/'));
  };
  location.href = location.href.replace(/http\:\/\/([^\/]*)\//, 'http:\/\/$1.simsrad.net.ocs.mq.edu.au\/');
})();
