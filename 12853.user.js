// ==UserScript==
// @name          AutoTrader UK link fixer - V2
// @namespace     http://www.strawp.net/greasemonkey
// @description	  Changes car details popups to straight links - This is a fix and cleanup over the other script on this site!! It should be working kind of alright now.
// @include       http://*autotrader.co.uk*
// ==/UserScript==

(function(){
    cLinks = document.getElementsByTagName( "a" );

    for( i=0; i<cLinks.length; i++ ){
      if( aMatch = cLinks[i].href.match( /javascript:more_info\(([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)\)\;/ ) ){
        cLinks[i].href="CARS_popup.jsp?id="+aMatch[1];
      }
    }
}
)();

