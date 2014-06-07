// ==UserScript==
// @name           OpenDNS2Goolge
// @namespace      Redirect OpenDNS Search to Google
// @description    Redirect OpenDNS Search to Google http://guide.opendns.com/main?url=* to http://www.google.com/search?q=*
// @include        http://guide.opendns.com/*
// @match          http://guide.opendns.com/*
// @version        LAST
// ==/UserScript==

defLoc = new String(parent.location);
parseKey = defLoc.split("url=");
if(parseKey[1] != "") parent.location =  "http://www.google.com/search?q="+parseKey[1];