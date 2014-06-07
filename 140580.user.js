// HTTP-to-HTTPS redirector script
//
// WARNING: Enable *only* sites and pages you *know* work the same
// with or without SSL! Failure to comply *will* cause b0rkage.
// (Okay, if you know what you're doing, you also know this isn't
// necessarily true, but then this warning isn't for you anyway.)
//
// ==UserScript==
// @name	HTTP-to-HTTPS redirector
// @namespace	http://freso.dk/
// @description	Replace http:// with https:// in the address bar, to make sure you're using the SSL-encrypted version of a page. Only enable for pages that you know are SSL enabled.
// @copyright	2006, Frederik "Freso" S. Olesen (http://freso.dk/)
// @license	Creative Commons Attribution 3.0; http://creativecommons.org/licenses/by/3.0/
// @include	http://*.erepublik.com/*
// ==/UserScript==
(function(){
  var debug = 0;
  var new_location = location.href.replace(/http\:/, 'https:');
  if ( debug > 0 ) {
    alert(  "Hash:     "+location.hash+
          "\nHost:     "+location.host+
          "\nHostname: "+location.hostname+
          "\nHREF:     "+location.href+
          "\nPathname: "+location.pathname+
          "\nPort:     "+location.port+
          "\nProtocol: "+location.protocol+
          "\n"+
          "\nNew Location: "+new_location);
  };
  location.href = new_location;
})();