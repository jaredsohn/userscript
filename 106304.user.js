// YouTube http to https
//
// ==UserScript==
// @name	YouTube http to https
// @description	Replaces http with https on YouTube.
// @include	http://www.youtube.com/*
// @exclude	https://*
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