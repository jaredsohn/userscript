
// ==UserScript==
// @name          AmazonLink2FR
// @namespace     http://properler.free.fr/gm
// @description	  add a link to the French page for a book
// @include       http://www.amazon.com/*
// ==/UserScript==
// Author: StÃÂ©phane Payrard (stef@payrard.net)



var d = document;
var res;

//alert( "tata");
if ( res =  d.location.href.match('/(\\d+)/')) {
    var res1 = d.evaluate( '//td[@class="tools"]' , d.body, null, XPathResult.ANY_TYPE, null );
    var td = res1.iterateNext()
    var a = d.createElement("a");
    var tn = d.createTextNode("fr");
    a.appendChild(tn);
    var url = "http://www.amazon.fr/exec/obidos/ASIN/" + res[1];
    a.setAttribute("href", url);
    tn = d.createTextNode(" | ");
    td.appendChild(tn);
    td.appendChild(a);
}


