// HTTP-to-HTTPS redirector script
//
// ==UserScript==
// @name	HTTP-to-HTTPS redirector
// @namespace	http://freso.dk/
// @description	Replace http:// with https:// in the address bar, to make sure you're using the SSL-encrypted version of a page. Only enable for pages that you know are SSL enabled.
// @copyright	2006+, Frederik "Freso" S. Olesen (http://freso.dk/)
// @license	Creative Commons Attribution 3.0; http://creativecommons.org/licenses/by/3.0/
//
// This version have been modified to use (i)  only the most popular sites on the Freso list
//                                        (ii) every Wikimedia site (except .wmflabs.org)
//
// @include	http://facebook.com/*
// @include	http://www.facebook.com/*
// @include	http://twitter.com/*
// @include	http://myspace.com/*
// @include	http://www.myspace.com/*
// @include	http://www.youtube.com/*
// @include	http://login.yahoo.com/*
// @include	http://login.passport.net/uilogin.srf*
// @include	http://sourceforge.net/*
// @include	http://www.microsoft.com/*
// @include	http://userscripts.org/*
// @include	http://*.wikipedia.org/*
// @include	http://*.wikimedia.org/*
// @include	http://*.wikispecies.org/*
// @include	http://*.mediawiki.org/*
// @include	http://*.wikinews.org/*
// @include	http://*.wikisource.org/*
// @include	http://*.wikibooks.org/*
// @include	http://*.wikiversity.org/*
// @include	http://*.wikiquote.org/*
// @include	http://*.wikidata.org/*
// @include	http://*.wiktionary.org/*
// @include http://*.wikimediafoundation/*
// @exclude	https://*
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
