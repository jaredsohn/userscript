// ==UserScript==
// written by Ayechan Koko
// @name        facebook helper
// @namespace   local
// @description Replace www with upload in facebook urls for unblocking facebook.Written by Ayechan Koko
// @include     *.www.facebook.com/*
// @include     *.facebook.com/*
// @run-at 	document-start
// @exclude     *upload.facebook.com/*
// @exclude     https://m.facebook.com/
// @version     1
// ==/UserScript==
(function(){
  var debug = 0;
  var new_location = location.href.replace(/www\./, 'upload.');
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