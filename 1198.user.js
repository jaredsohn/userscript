// ==UserScript==
// @name          CrossAmazon
// @namespace     http://properler.free.fr/gm
// @description	  in a amazon.com book related page, add  links to ca, de, fr, jp and uk pages
// @include       http://www.amazon.com/*
// ==/UserScript==
// Author: StÃÂ©phane Payrard (stef@payrard.net)



var d = document;
var res;
var where  = [ "ca", "de", "fr", "jp", "co.uk" ]
var where2  = [ "ca", "de", "fr", "jp", "uk" ]


if ( res =  d.location.href.match('/(\\d+)/')) {
    var res1 = d.evaluate( '//td[@class="tools"]', d.body, null, XPathResult.ANY_TYPE, null );
    var td = res1.iterateNext();
    var i;
    for ( var i in where) {
      var a = d.createElement("a");
      var tn = d.createTextNode(where2[i]);
      a.appendChild(tn);
      var url = "http://www.amazon." + where[i] + "/exec/obidos/ASIN/" + res[1];
      a.setAttribute("href", url);
      tn = d.createTextNode(" | ");
      td.appendChild(tn);
      td.appendChild(a);
   }
}