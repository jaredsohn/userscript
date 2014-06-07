// ==UserScript==
// @id             DisableWCM
// @name           Disable WCM
// @version        1.0
// @namespace      DisableWCM
// @author         
// @description    keep using wcmmode=DISABLED if you started that way. 
// @include        *?wcmmode=DISABLED
// @run-at         document-end
// ==/UserScript==




function isExternal(url) {
    var a =  document.createElement('a');
    a.href = url;    
    if( a.protocol !== location.protocol) return true;
    if( a.host !== location.host) return true;
    return false;
}

// get all the hrefs
var links = document.getElementsByTagName("a"); //array

// if they're local, make sure that we use wcmmode=disabled
for (var i=0,imax=links.length; i<imax; i++) {
   
   var myLink = links[i]
   
   if (isExternal(myLink.href) ){continue;}
    
   if (myLink.search ==="") { 
       links[i].search = "?wcmmode=DISABLED"; 
   } else {
       links[i].search +="&wcmmode=DISABLED";   
   }
}

