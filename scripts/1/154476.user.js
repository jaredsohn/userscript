// ==UserScript==
// @name	HTTP-to-HTTPS redirector
// @namespace	http://freso.dk/
// @description	Replace http:// with https:// in the address bar, to make sure you're using the SSL-encrypted version of a page. Only enable for pages that you know are SSL enabled.
// @copyright	2006+, Frederik "Freso" S. Olesen (http://freso.dk/)
// @license	Creative Commons Attribution 3.0; http://creativecommons.org/licenses/by/3.0/
// @include	http://facebook.com/*
// @include	http://www.facebook.com/*
// @include	http://twitter.com/*
// @include	http://myspace.com/*
// @include	http://www.myspace.com/*
// @include	http://www.youtube.com/*
// @include	http://login.yahoo.com/*
// @include	http://zh.wikipedia.org/*
// @include	http://en.wikipedia.org/*
// @exclude	https://*
// @exclude	http://mail.google.com/mail/?view=mm&at=*
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
