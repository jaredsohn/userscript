// ==UserScript==
// @name           Secure - Rapidhacks
// @description    Makes rapidhacks.com more secure useing a secure connection.
// @version        0.0.1
// @author         RapidCrew - ADK
// @namespace      http://www.rapidhacks.com/
// @homepage       http://www.rapidhacks.com/
// @include        http://www.rapidhacks.com/*
// @Note           Well we dont need notes :)
// ==/UserScript==

// Visit Rapidhacks.com
//
// Thanks, RapidCrew.
//

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
