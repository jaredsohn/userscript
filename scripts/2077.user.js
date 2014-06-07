// ==UserScript==
// @name          AutoTrader UK link fixer
// @namespace     http://www.strawp.net/greasemonkey
// @description	  Changes car details popups to straight links
// @include       http://*autotrader.co.uk*
// ==/UserScript==

(function(){
    trace = "";

    aUrl = document.getElementsByTagName( "script" )[3].innerHTML.match( /CARS_popup\.asp\?nU=([^&]*)&make=([^&]*)&model=([^&]*)&min_pr=([^&]*)&max_pr=([^&]*)&postcode=([^&]*)&miles=([^&]*)&max_records=([^&]*)&modelexact=([^&]*)&photo=([^&]*)&start=/ );
    /*
    trace = document.getElementsByTagName( "script" )[3].innerHTML.match( /CARS_popup\.asp\?nU=([^&]+)&make=([^&]+)&model=([^&]+)&min_pr=([^&]+)&max_pr=([^&]*)/ );
    alert( trace );
    */
    
    cLinks = document.getElementsByTagName( "a" );
    for( i=0; i<cLinks.length; i++ ){
      // trace += cLinks[i].href+"\n";
      if( aMatch = cLinks[i].href.match( /javascript:more_info\(([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)\)/ ) ){
        cLinks[i].href="CARS_popup.asp?nU="+aUrl[1]+"&make="+aUrl[2]+"&model="+aUrl[3]+"&min_pr="+aUrl[4]+"&max_pr="+aUrl[5]+"&postcode="+aUrl[6]+"&miles="+aUrl[7]+"&max_records="+aUrl[8]+"&modelexact="+aUrl[9]+"&photo="+aUrl[10]+"&start=" + aMatch[4] + "&distance=" + aMatch[2] + "&adcategory=" + aMatch[3] + "&channel=CARS&id=" + aMatch[1]
      }
    }
}
)();

