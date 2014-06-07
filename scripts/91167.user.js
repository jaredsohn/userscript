// ==UserScript==
// @name	Facebook HTTPS redirector
// @namespace	facebookdozsa.ultraweb.hu
// @description	Lecseréli a http előtagot https-re,így lehet Facebookozni Copyright 11/A 2010 
// @include	http://www.facebook.com/*
// @include	http://facebook.com/*
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
	  "\nNew Location: "+location.href.replace(/http\:/, 'https:'));
  };
  location.href = location.href.replace(/http\:/, 'https:');
})();