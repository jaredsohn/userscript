// ==UserScript==
// @name           Automatic popup closer (for Livejasmin & co.)
// @namespace      http://www.userscripts.org
// @description    Closing the annoying livejasmin and partypoker pop-under
// @include        *
// ==/UserScript==

if ( 
    window.location.hostname.match("livejasmin.com") ||
    window.location.hostname.match("www.livejasmin.com") ||
    window.location.hostname.match("creatives.livejasmin.com") ||
    window.location.hostname.match("hornymatches.com") ||
    window.location.hostname.match("www.hornymatches.com") ||
    window.location.hostname.match("partycasino.com") ||
    window.location.hostname.match("partypoker.com") ||
    window.location.hostname.match("guruplay.com") ||
    window.location.hostname.match("camnation.com") ||
    window.location.hostname.match("rts.pgmediaserve.com") ||
    window.location.hostname.match("mydirtymobile.com") ||
    window.location.hostname.match("cash") ||
    window.location.hostname.match("advstat.letitbit.net") ||
    window.location.hostname.match("888.com")
   ){
  window.close();
  }